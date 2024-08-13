import Category from "./Category"
import {useContext, useState,useEffect } from "react";
import MyContext from "../Context/context";

export default function Body(){
    const {setSongs} = useContext(MyContext)
    const [data, setData] = useState({
        Trending : [],
        Soother: [],
        Top50: [],
        Top20: [],
        EverGreen: [],
        happy: [],
        romantic: [],
        excited: [],
        sad : []
    });
    const [isLoading, setIsloading] = useState(true);
    const filterData = (data) => {
        const obj = {
            Trending : [],
            Soother: [],
            Top50: [],
            Top20: [],
            EverGreen: [],
            happy: [],
            romantic: [],
            excited: [],
            sad : []
        }

        data.forEach(it => {
            if(it.featured === "Trending songs")
                obj.Trending.push(it);
            else if(it.featured === "Soul soother")
                obj.Soother.push(it);
            else if(it.featured === "Top 50 of this month")
                obj.Top50.push(it);
            else if(it.featured === "Top 20 of this week")
                obj.Top20.push(it);
            else if(it.featured === "Evergreen melodies")
                obj.EverGreen.push(it);
            else
                obj[it.mood].push(it);
        });
        setData(obj);
        setIsloading(false);
    }
    useEffect(() => {
        fetch('https://academics.newtonschool.co/api/v1/musicx/song?limit=500',{
            method: "GET",
            headers: {
                'accept': 'application/json',
                'projectID': 'gonikotv90ms'
            }
        })
        .then(response => response.json())
        .then(d => {
            filterData(d.data);
            setSongs(d.data)
        });
    }, []);
    return (
        <div className=" px-20 pt-[120px]">
            <Category type={"Trending"} Data={data.Trending}/>
            <Category type={"Top 20 of this week"} Data={data.Top20}/>
            <Category type={"Top 50 of this month"} Data={data.Top50}/>
            <Category type={"Evergreen melodies"} Data={data.EverGreen}/>
            <Category type={"Happy"} Data={data.happy}/>
            <Category type={"Romantic"} Data={data.romantic}/>
            <Category type={"Excited"} Data={data.excited}/>
            <Category type={"Sad"} Data={data.sad}/>
        </div>
    )
}