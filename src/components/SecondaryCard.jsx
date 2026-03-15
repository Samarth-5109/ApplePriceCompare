import React from "react";

function SecondaryCard({country, currency, price, usd,flag, color="slate"}) {
  return (
    <div className={`w-45 flex flex-col gap-2 items-center p-5 bg-${color}-200 rounded-lg`}>
        <p className="text-2xl">{flag}</p>
      <h2 className={`font-medium text-${color}-900 text-sm`}>{country}</h2>
      <p className={`font-bold text-${color}-700 text-xl`}><span>{currency}</span> {price}</p>
      <p className={`text-xs text-${color}-600`}> {usd}</p>
    </div>
  );
}

export default SecondaryCard;
