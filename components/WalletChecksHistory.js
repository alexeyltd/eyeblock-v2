const WalletChecksHistory = ({ checks }) => {
    if (checks === 0) {
      return (
        <div className="text-center py-8">
          <svg
            className="mx-auto w-24 h-24 text-base-content/20"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          <p className="text-base-content/60 mt-4">
            Looks like you haven't started any wallet check yet
          </p>
        </div>
      );
    }
  
    // Implement the history list here when checks > 0
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Wallet Checks History</h3>
        {/* Add the history list items here */}
      </div>
    );
  };

  export default WalletChecksHistory;