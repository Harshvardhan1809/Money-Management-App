import React from 'react'

export default function Carousel() {
  return (
    <div className="carousel flex overflow-scroll flex-nowrap">

        <div className="carousel-item flex justify-between items-center">
            <div className="flex flex-row">
                <i className="fa fa-thin fa-utensils fa-2xl"></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[24px] text-right">Food</p>
                <p className="text-[15px] text-right">&yen;1200 this month</p>
            </div>
        </div>

        <div className="carousel-item flex justify-between items-center">
            <div className="flex flex-row">
                <i className="fa fa-thin fa-train fa-2xl"></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[24px] text-right">Transportation</p>
                <p className="text-[15px] text-right">&yen;3800 this month</p>
            </div>
        </div>
        
        <div className="carousel-item flex justify-between items-center">
            <div className="flex flex-row">
                <i className="fa fa-thin fa-shirt fa-2xl"></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[24px] text-right">Clothes</p>
                <p className="text-[15px] text-right">&yen;3800 this month</p>
            </div>
        </div>   

        <div className="carousel-item flex justify-between items-center">
            <div className="flex flex-row">
                <i className="fa fa-solid fa-film fa-2xl"></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[24px] text-right">Entertainment</p>
                <p className="text-[15px] text-right">&yen;3800 this month</p>
            </div>
        </div>     

        <div className="carousel-item flex justify-between items-center">
            <div className="flex flex-row">
                <i className="fa fa-solid fa-film fa-2xl"></i>
            </div>
            <div className="flex flex-col">
                <p className="text-[24px] text-right">Entertainment</p>
                <p className="text-[15px] text-right">&yen;3800 this month</p>
            </div>
        </div>     

    </div>
  )
}
