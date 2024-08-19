import React, { useState } from "react";

const WalletIDValidator = ({ onCheck }) => {
  const [walletID, setWalletID] = useState("");
  const [blockchain, setBlockchain] = useState("ethereum");

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidate(walletID, blockchain);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        Looking for validating a Wallet ID?
      </h3>
      <p className="text-base-content/80">
        Just copy and paste the Wallet Address link
      </p>
      <div className="flex space-x-2">
        <select
          id="blockchain"
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-opacity-50"
          value={blockchain}
          onChange={(e) => setBlockchain(e.target.value)}
          defaultValue="ethereum" // Set default value here
        >
          <option value="ethereum">Ethereum</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="litecoin">Litecoin</option>
        </select>
        <input
          type="text"
          id="wallet-id"
          className="input input-bordered flex-grow"
          value={walletID}
          onChange={(e) => setWalletID(e.target.value)}
          placeholder="Enter wallet ID"
        />
        <button onClick={onCheck} className="btn btn-primary">
          Check
        </button>
      </div>
      <p className="text-sm text-base-content/60">
        To be able to perform Wallet ID check you must first{" "}
        <a href="#" className="text-primary hover:underline">
          upgrade your plan
        </a>
      </p>
    </div>
  );
};

export default WalletIDValidator;
