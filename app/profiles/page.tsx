import Add from "./add";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile List',
    description: 'ini adalah halaman data profile',
  }

type Profile = {
    id: number;
    name: string;
    age: number;
}

async function getProfiles(){
    const res = await fetch('http://localhost:5000/profiles', 
    // agar data nya tidak static, data diambil setiap req
    {cache:'no-store',});
    // incremental static regeneration
    // {next: {revalidate: 10}});
    return res.json();

}

export default async function ProfileList() {
    const profiles: Profile[] = await getProfiles();
    return (
        <div className="py-10 px-10">
            <div className="py-2">
                <Add/>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {profiles.map((profile, index) => (
                      <tr key={profile.id}> 
                        <td>{index+1}</td>
                        <td>{profile.name}</td>
                        <td>{profile.age}</td>
                        <td></td>
                      </tr>
                    ))}
                    
                </tbody>
            
            </table>
        </div>
    )
}