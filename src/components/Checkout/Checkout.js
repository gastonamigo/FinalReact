import './Checkout.css'
import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, getDocs, query, where, documentId, writeBatch, addDoc } from 'firebase/firestore'
import { db } from '../../services/firebase/index'
import { useNavigate } from "react-router-dom"
import  ClientForm  from '../Form/Form'
import Swal from 'sweetalert2'

const Checkout = () => {
    const [loading, setLoading] = useState(false)

    const [personalData, setPersonalData] = useState(false)
    
            const [datosCompra, setDatosCompra] = useState({}) 

    const information = (name, lastname, address, phone, email) =>{
            setDatosCompra({name, lastname, address, phone, email})
            setPersonalData(true)
        }
    

    const { cart, total, clearCart} = useContext(CartContext)

    const navigate = useNavigate()
    
    const createOrder = async () => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: datosCompra,
                items: cart,
                total: total
            }
            console.log (objOrder)
            const batch = writeBatch(db)

            const outOfStock = []

            const ids = cart.map(prod => prod.id)
            
    
            const productsRef = collection(db, 'Products')
    
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const { docs } = productsAddedFromFirestore

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                await batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)

                clearCart()

                setTimeout(() => {
                    navigate('/')
                }, 2000)
                console.log(`El id de su orden es: ${orderAdded.id}`)
                
                    Swal.fire({
                        icon: 'success',
                        title: 'La orden de compra se realizo con exito',
                        text: `Codigo de operacion: ${orderAdded.id}`,
                                                
                    })
               
                
            } 

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }


     
    if(loading) {
        return <h1>Se esta procesando su pedido...</h1>
    }
    



    return (    
        <div className='checkout'>
            <h1 className='titulo'>Completa los siguientes datos.</h1>
            <ClientForm information={information}/>
            { personalData 
           
            ?<button className='ButtonConfirm' onClick={createOrder}>Generar Pedido</button> 
            : ""}
        </div>
    )
}

export default Checkout
