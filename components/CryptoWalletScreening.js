"use client";

import { useState } from "react";
import WalletChecksHistory from "./WalletChecksHistory";
import WalletIDValidator from "./WalletIDValidator";

const CryptoWalletScreening = () => {
    const [checks, setChecks] = useState(0);
  
    return (
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-8 py-16 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Crypto Wallet Screening</h2>
            <button className="btn btn-outline btn-sm">
              {checks} Check{checks !== 1 && 's'}
            </button>
          </div>
  
          <div className="bg-base-300 p-4 rounded-lg flex justify-between items-center">
            <span className="text-base-content">Still not sure how it works?</span>
            <button className="btn btn-primary btn-sm">
              See Example
            </button>
          </div>
  
          <WalletIDValidator onCheck={() => setChecks(checks + 1)} />
          <WalletChecksHistory checks={checks} />
        </div>
      </section>
    );
  };
  
  export default CryptoWalletScreening;