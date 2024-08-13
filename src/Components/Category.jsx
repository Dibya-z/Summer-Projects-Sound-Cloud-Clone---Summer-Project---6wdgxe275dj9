import Album from "./Album";
import { Carousel } from 'primereact/carousel';
        

export default function Category({type, Data}){
    return (
            <div className="">
                <h1 className=" text-[25px] text-gray-600 font-light" >{type}</h1>
                <div className="flex overflow-x-auto">
                    {Data.map(it => {
                        let s = "";
                        // console.log(it.artist);
                        // for(let i = 0; it.artist.length; i++){
                        //     s += it.artist[i].name + ", ";
                        // }
                        // s = s.slice(0, s.length - 2);
                        for(let i = 0; i < it.artist.length; i++){
                            // console.log(it.artist[i].name);
                            s += it.artist[i].name + ", ";
                        }
                        s = s.slice(0, s.length - 2);
                        // console.log(s);
                        // console.log(it.thumbnail);
                        return <Album url={it.thumbnail} title={it.title} artist={s} key = {it.id} id={it._id}/>
                    })}
                </div>
                
            </div>
        
    )
}