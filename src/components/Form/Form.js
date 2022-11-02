import Swal from "sweetalert2";
import { useState, createContext } from "react";
import './Form.css' 

const ClientForm = ({ information }) => {

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [phone, setPhone] = useState("");




    const submit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !address) {
            Swal.fire({
                icon: 'error',
                title: 'Completa tus datos',
                text: 'Te falto algun dato por completar',
            })



        }
        else if (email !== checkEmail && email && checkEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Los emails no coinciden',
                text: 'Verifica que sean iguales',
            })
        }

        else {
            information(
                name,
                lastname,
                address,
                phone,
                email
            )
        }
    }



    return (


        <div className="card container mt-5">

            <div className='m-5' >
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control m-3" placeholder="Nombre" required />
                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="form-control m-3" placeholder="Apellido" required />
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control m-3" placeholder="Dirección" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control m-3" placeholder="Email" required />
                <input value={checkEmail} onChange={(e) => setCheckEmail(e.target.value)} type="Confirme Email" className="form-control m-3" placeholder="Email" required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="form-control m-3" placeholder="Teléfono" required />
                <button className="Button" onClick={submit}> Confirmar Datos</button>            
            </div>
            

        </div>
    )
}
export const FormData = createContext({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: ""
})

export default ClientForm