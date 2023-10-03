'use client';
// event handling & state
import {SyntheticEvent,useState } from "react";
// agar bisa melihat perubahan data setelah di submit
import { useRouter } from "next/navigation";

export default function Add ()  {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        // agar saat submit tidak reload
        e.preventDefault();
        // ada proses asinkron pengiriman data ke server
        setIsMutating(true); 
        // menambahakan data baru
        await fetch('http://localhost:5000/profiles',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                age: age,
            })
        });

        setIsMutating(false);

        setName("");
        setAge("");
        // menampilkan data terabru
        router.refresh();
        // tutup modal
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }

  return (
    <div>

        <button className="btn" onClick={handleChange}>Add New</button>

    <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Data</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label font-bold">Name</label>
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input w-full input-bordered" 
                    placeholder="Input Name"/>
                </div>
                <div className="form-control">
                    <label className="label font-bold">Age</label>
                    <input 
                    type="text" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input w-full input-bordered" 
                    placeholder="Input Age"/>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMutating ? ( <button type="submit" className="btn btn-primary">Save</button> ): 
                    (<button type="button" className="btn loading">Saving...</button>)}
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}


