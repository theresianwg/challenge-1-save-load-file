'use client';
import {useState } from "react";
// agar bisa melihat perubahan data setelah di submit
import { useRouter } from "next/navigation";

type Profile = {
    id: number;
    name: string;
    age: number;
}

export default function Delete (profile : Profile)  {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    async function handleDelete(profileId: number) {
        // agar saat submit tidak reload
        setIsMutating(true);
        await fetch(`http://localhost:5000/profiles/${profileId}`,{
            method: 'DELETE',
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

        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

    <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure to delete profile data {profile.name}?</h3>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMutating ? ( <button type="button" onClick={() => handleDelete(profile.id)} className="btn btn-primary">Delete</button> ): 
                    (<button type="button" className="btn loading">Deleting...</button>)}
                </div> 
        </div>
      </div>
    </div>
  )
}


