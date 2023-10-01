'use client';
import {SyntheticEvent,useState } from "react";
// agar bisa melihat perubahan data setelah di submit
import { useRouter } from "next/navigation";

type Profile = {
    id: number;
    name: string;
    age: number;
}

export default function Edit (profile: Profile)  {
    const [name, setName] = useState(profile.name);
    const [age, setAge] = useState(profile.age);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleEdit(e: SyntheticEvent) {
        // agar saat submit tidak reload
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/profiles/${profile.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                age: age,
            })
        });

        setIsMutating(false);

        router.refresh();
        // tutup modal
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }

  return (
    <div>

        <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>

    <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Edit profile data {profile.name}</h3>
            <form onSubmit={handleEdit}>
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
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="input w-full input-bordered" 
                    placeholder="Input Age"/>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMutating ? ( <button type="submit" className="btn btn-primary">Edit</button> ): 
                    (<button type="button" className="btn loading">Editing...</button>)}
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}


