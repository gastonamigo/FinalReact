import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, getDocs, query, where, documentId, writeBatch, addDoc } from 'firebase/firestore'
import { db } from "../../services/firebase"
import { useNavigate } from "react-router-dom"


const Checkout = () => {
    const [loading, setLoading] = useState(false)

    const { cart, total, clearCart } = useContext(CartContext)
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");



    const navigate = useNavigate()
    const [personalData, setPersonalData] = useState (false) 

    const submit = (e) => {
        e.preventDefault ();
        // if (!name && !email && !phone && !address)
        //     {
        //         Swal.fire({
        //             title: "Completa tus datos",
        //             icon: "warning",
        //             buttons: true,
        //             dangerMode: true,
            
        //         })
        //     }
        // else 
        setPersonalData(true);
        }

    const createOrder = async () => {
        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    name: {name},
                    address: {address},
                    phone: {phone},
                    mail: {email}
                },
                items: cart,
                total: total
            }
            
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

                console.log('success', `El id de su orden es: ${orderAdded.id}`)
            } else {
                console.log('error','hay productos que estan fuera de stock')
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
        <div>
            <h1>Completa los datos para generar la orden.</h1>
            <div className='myForm1' >
                <input  value={name} onChange={(e) => setName(e.target.value)} type="text"   className="form-input"   placeholder="Nombre" />
                <input value={address}onChange={(e) => setAddress(e.target.value)}type="text"   className="form-input"   placeholder="Dirección" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  className="form-input"   placeholder="Email" />
                <input value={phone}onChange={(e) => setPhone(e.target.value)} type="number" className="form-input"   placeholder="Teléfono" />
            </div>
            <h1>Checkout</h1>

            {   personalData
                ?<button onClick={createOrder}>Generar Pedido</button>


                :  <div>
                    <p>Complete sus datos</p>
                    <button onClick={submit}> Almacenar datos </button>
                </div>

            
            } 
            
        </div>
    )
}

export default Checkout