// ... (your imports)

// ... (rest of your code)

const RegionDropdownComponent = () => {
  // ... (your existing state and functions)

  // Added state to keep track of the currently selected grid for editing
  const [selectedGridIndex, setSelectedGridIndex] = useState(null);

  // ... (your existing code)

  const handleEditClick = (gridIndex) => {
    // Set the index of the selected grid for editing
    setSelectedGridIndex(gridIndex);
    // Open the edit modal
    openUpdateModal();
  };

  return (
    <div>
      {/* ... (your existing code) */}

      {isSearchPerformed && showGrid ? (
        allDetailedData.map((detailedData, dataIndex) => (
          <div key={dataIndex} className='px-4 m-6 bg-slate-300 rounded-2xl mt-6'>
            {/* Display a header for each set of detailed data */}
            <div className='flex flex-col'>
              <div className='flex p-4 py-5 px-2'>
                <div className='flex-grow flex justify-center items-center p-4'>
                  <div className='mr-10 mb-3 text-2xl font-medium'>
                    {/* Use a property from detailedData for the header */}
                    {detailedData.length > 0 && detailedData[0].contractName && (
                      <h1 className='py-4 text-xl font-semibold'>{detailedData[0].contractName}</h1>
                    )}
                  </div>
                </div>
                <div className='flex justify-end py-6 space-x-5'>
                  {/* Add an "Active" button for each set of detailed data */}
                  <button
                    className='bg-green-800 p-6 text-white px-4 py-2 rounded-lg'
                    onClick={() => handleSetActive(detailedData)}
                  >
                    Active
                  </button>
                </div>
              </div>

              {/* Iterate over the contracts in the group and render individual grids */}
              {detailedData.map((contract, contractIndex) => (
                <div key={contractIndex} className='grid grid-cols-4 grid-rows-4'>
                  {Object.entries(contract)
                    .filter(
                      ([key, value]) =>
                        value !== 'false' &&
                        key !== 'technology' &&
                        key !== 'region' &&
                        key !== 'plant' &&
                        key !== 'contractName' &&
                        key !== 'isActive' &&
                        key !== 'updateHistory'
                    )
                    .map(([key, value], innerIndex) => (
                      <div key={innerIndex} className='bg-gray-200 w-11/12 h-24 inline-block m-4 py-2 rounded-lg'>
                        <div className='flex-col px-2'>
                          <div>
                            <div className='flex flex-col w-4/5'>
                              <div className='text-sm font-bold px-2'>{aliasNames[key] || key}:</div>
                              <div>
                                <span className='p-2 text-md' style={{ wordBreak: 'break-all', overflowWrap: 'break-word', overflow: 'scroll' }}>
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

              {/* Add Edit and Update buttons for each set of detailed data */}
              <div className='flex justify-center items-center p-4'>
                <button
                  onClick={() => handleEditClick(dataIndex)}
                  className='bg-blue-800 p-6 text-white px-4 py-2 rounded-lg mr-4'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleUpdateClick(dataIndex)}
                  className='bg-yellow-500 p-6 text-white px-4 py-2 rounded-lg'
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        // ... (your existing code)
      )}
    </div>
  );
};

export default RegionDropdownComponent;

{/*create new contract part*/}
{isSearchPerformed && showGrid ? (
  <div className='flex justify-between px-10 py-10 '>
    <div className='text-2xl py-3'>Contracts</div>
    <div>
      <button
        className='bg-gray-400 p-3 rounded-lg'
        onClick={opennewModal}
      >
        Create New Contract
      </button>
      <Modal
        isOpen={newmodalIsOpen}
        onRequestClose={closenewModal}
        contentLabel='Edit Modal'
      >
        <div>
          <div className='flex justify-end'>
            <button
              type='button'
              className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
              onClick={closenewModal}
            >
              X
            </button>
          </div>
          <div>
            <div class='flex'>
              <div class='flex-none p-4'>
                <span class='bg-gray-500 p-6 text-white px-4 py-2 rounded-xl'>
                  Create Contract Mode
                </span>
              </div>
              <div class='flex-grow flex justify-center items-center p-4'>
                <div className='mr-24  mb-4  text-xl font-medium'>
                  Create New Contract
                </div>
              </div>
            </div>
            {/* this is the grid component for the new page*/}
            <NewGridComponent
              newdetailedData={newdetailedData}
              setnewDetailedData={setnewDetailedData}
            />
          </div>
        </div>
      </Modal>
    </div>
  </div>
) : isLoading ? (
  <div className='flex justify-center items-center py-8'>
    <div className=' p-10 text-2xl font-medium bg-slate-300 rounded-xl  mt-6 animate-bounce w-4/5 text-center'>
      Loading
    </div>
  </div>
) : (
  <div className='flex justify-center items-center py-8'>
    <div className=' p-10 text-xl font-medium bg-slate-300 rounded-xl  mt-6 '>
      Choose Regions, Technology, and Plant from the dropdowns.
    </div>
  </div>
)}