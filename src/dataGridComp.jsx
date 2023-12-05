import React, { useState } from 'react';
import UpdatedSvg from './updatedsvg';
import NewContractsvg from './newContractsvg';
import aliasNames from './aliasNames.json';
import EditedSvg from './editedsvg';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";


const DataGridComponent = ({ detailedData }) => {
  if (!Array.isArray(detailedData)) {
    // Handle the case where detailedData is not an array (null, undefined, etc.)
    return <p></p>;
  }
  const hasActiveItem = Array.isArray(detailedData) && detailedData.some(item => item.isActive === "true");//active button
  const ContractName = Array.isArray(detailedData) && detailedData.find((item) => item.contractName);//contract name
  const [showTimeline, setshowTimeline] = useState(false);//timeline div
  const [udetailedData, setuDetailedData] = useState(null);//update modal data recieved
  const [edetailedData, seteDetailedData] = useState(null);//update modal data recieved

  const [updatemodalIsOpen, updatesetModalOpen] = useState(false);//tracks state of updatemodal
  const [ueditingKey, setUEditingKey] = useState(null);
  const [contractStartDate, setContractStartDate] = useState(null);
  const [contractEndDate, setContractEndDate] = useState(null);


  //UPDATE ----
  const [ueditedValues, setUEditedValues] = useState({});
  const [updateHistory, setUpdateHistory] = useState([]);

  {/*modal open, close state logic and displaying grid part of update modal*/ }


  const [updateModalStates, setUpdateModalStates] = useState(
    detailedData.map(() => false)
  );
  //Initially, updateModalStates is an array of false values, so no content for any grid is rendered.

  const openUpdateModal = (index) => {
    setUpdateModalStates((prevStates) => {
      const newStates = [...prevStates];//... just creates a copy of prevStates
      newStates[index] = true;
      return newStates;
    });
  };//  when an update button is clicked, it triggers the openupdatemodal and it 



  const closeUpdateModal = (index) => {
    setUpdateModalStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  // that ends here

  //tracking history and taking value input in key value pair of UPDATE

  const handleInputChange = (key, value) => {
    setUEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };


  const handleEditClick = (key, value) => {
    setUEditingKey(key);
    setUEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSaveClick = () => {
    const comment = document.getElementById('textareaUser').value;
  
    try {
      const updatedHistory = [];
  
      Object.keys(ueditedValues).forEach((key) => {
        const prevValueObject = detailedData.find((item) => item[key] !== undefined);
        const prevValue = prevValueObject ? prevValueObject[key] : undefined;
        const currentValue = ueditedValues[key];
  
        // Update the detailedData with the new value
        const updatedDetailedData = detailedData.map((item) =>
          item[key] !== undefined ? { ...item, [key]: currentValue } : item
        );
  
        // Update the updateHistory for each key
        const description = `${key} corrected from ${prevValue === undefined ? 'undefined' : prevValue} to ${currentValue === undefined ? 'undefined' : currentValue}`;
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description,
          comment: comment || 'Correcting as per contract',
        });
      });
  
      // Include contractStartDate and contractEndDate in the updatedHistory if they are defined
      if (contractStartDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract Start Date corrected from ${contractStartDate.toLocaleDateString()} to ${parseDate(detailedData[0].contractStartDate).toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      if (contractEndDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract End Date corrected from ${contractEndDate.toLocaleDateString()} to ${parseDate(detailedData[0].contractEndDate).toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      // Update the overall updateHistory state
      setUpdateHistory((prevHistory) => [...prevHistory, ...updatedHistory]);
      console.log('Update History:', updatedHistory);
    } catch (error) {
      console.error('Error updating history:', error);
    }
  
    // Handle saving the edited values
    console.log('Saving edited values:', ueditedValues);
    setUEditingKey(null);
  };
  

  //UPDATE ----

  //edit saving editedvalues and updatehistory

  const [editingKey, setEditingKey] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [eEditedValues, seteEditedValues] = useState({});
  const [eupdateHistory, esetUpdateHistory] = useState([]);
  const [econtractStartDate, esetContractStartDate] = useState(null);
  const [econtractEndDate, esetContractEndDate] = useState(null);

  const ehandleInputChange = (key, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
  
  const ehandleEditClick = (key, value) => {
    setEditingKey(key);
    setEditedValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };
  

  const eparseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };



  const handleSaveEClick = () => {
    const comment = document.getElementById('textareaUser').value;
  
    try {
      const updatedHistory = [];
  
      Object.keys(editedValues).forEach((key) => {
        const prevValueObject = detailedData.find((item) => item[key] !== undefined);
        const prevValue = prevValueObject ? prevValueObject[key] : undefined;
        const currentValue = editedValues[key];
  
        // Update the detailedData with the new value
        const updatedDetailedData = detailedData.map((item) =>
          item[key] !== undefined ? { ...item, [key]: currentValue } : item
        );
  
        // Update the updateHistory for each key
        const description = `${key} corrected from ${currentValue === undefined ? 'undefined' : currentValue} to ${prevValue === undefined ? 'undefined' : prevValue}`;
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description,
          comment: comment || 'Correcting as per contract',
        });
      });
  
      // Include contractStartDate and contractEndDate in the updatedHistory if they are defined
      if (econtractStartDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract Start Date corrected from ${econtractStartDate.toLocaleDateString()} to ${parseDate(detailedData[0].contractStartDate).toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      if (econtractEndDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract End Date corrected from ${econtractEndDate.toLocaleDateString()} to ${parseDate(detailedData[0].contractEndDate).toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      // Update the overall updateHistory state
      esetUpdateHistory((prevHistory) => [...prevHistory, ...updatedHistory]);
      console.log('Update History:', updatedHistory);
  
      seteDetailedData(updatedDetailedData);
    } catch (error) {
      console.error('Error updating history:', error);
    }
  
    // Handle saving the edited values
    console.log('Saving edited values:', editedValues);
    setEditingKey(null);
  };
  

  const [editModalStates, seteditModalStates] = useState(
    detailedData.map(() => false)
  );
  //Initially, updateModalStates is an array of false values, so no content for any grid is rendered.

  const openEditModal = (index) => {
    seteditModalStates((prevStates) => {
      const newEditStates = [...prevStates];//... just creates a copy of prevStates
      newEditStates[index] = true;
      console.log(newEditStates)
      return newEditStates;
    });
  };//  when an update button is clicked, it triggers the openupdatemodal and it 



  const closeEditModal = (index) => {
    seteditModalStates((prevStates) => {
      const newEditStates = [...prevStates];
      newEditStates[index] = false;
      return newEditStates;
    });
  };

  const handleClick = () => {
    setshowTimeline(!showTimeline);
  };//to show the timeline 



  return (
    <div>
      {Array.isArray(detailedData) ? (
        detailedData.length > 0 ? (
          <div className="">
            {detailedData.map((item, index) => (
              <div key={index} className='px-7 m-7 py-3 bg-slate-300 rounded-2xl mt-6 '>
                <div className='flex mr-2 justify-between'>
                  <div className='p-4 py-5 px-4'>
                    {hasActiveItem && (
                      <div className="bg-green-500 p-6 text-white px-5 py-2 rounded-xl">Active</div>
                    )}
                  </div>
                  <div className=' flex justify-center items-center py-4  p-4'>
                    <div className='mr-10 mb-3 text-2xl font-medium '>
                      {ContractName && (
                        <h1 className='py-4 text-xl font-semibold'>{item.contractName}</h1>
                      )}
                    </div>
                  </div>
                  <div className='flex justify-end py-6 space-x-5'>
                    {/*update-starts-here */}

                    <div className=''>
                      <button
                        onClick={() => openUpdateModal(index)}
                        className='bg-green-800 p-6 text-white px-4 py-2 rounded-lg'
                      >
                        Update
                      </button>
                      {updateModalStates[index] && (
                        <Modal
                          isOpen={true}
                          onRequestClose={() => closeUpdateModal(index)}
                          contentLabel='Edit Modal'
                        >
                          <div>
                            <div className='flex justify-end'>

                              <button
                                type='button'
                                className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
                                onClick={() => closeUpdateModal(index)}
                              >
                                X
                              </button>
                            </div>
                            <div>
                              <div className='flex'>
                                <div className='flex-none p-4'>
                                  <span className='bg-green-800 p-6 text-white px-4 py-2 rounded-lg'>
                                    Update Mode
                                  </span>
                                </div>
                                <div className='flex-grow flex justify-center items-center p-4'>
                                  <div className='mr-10 mb-4  text-2xl font-medium'>
                                    {item.contractName}
                                  </div>
                                </div>
                              </div>
                              {/*update GRID starts here */}
                              <div>
                                <div className="grid grid-cols-4 grid-rows-4">
                                  {Object.entries(item)
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
                                      <div>

                                        <div className="" key={innerIndex}>

                                          <div className="bg-gray-200 w-11/12 h-24  inline-block m-4 py-2 rounded-lg">
                                            <div className="flex-col px-2">
                                              <div className="">
                                                <div className="flex flex-col ">
                                                  <div className="text-sm  font-bold px-1">
                                                    {aliasNames[key] || key}:
                                                  </div>
                                                  <div>
                                                    <div>
                                                      {key === 'contractStartDate' || key === 'contractEndDate' ? (
                                                        <DatePicker
                                                          selected={
                                                            key === 'contractStartDate'
                                                              ? contractStartDate || parseDate(item[key])
                                                              : contractEndDate || parseDate(item[key])
                                                          }
                                                          onChange={(date) => key === 'contractStartDate' ? setContractStartDate(date) : setContractEndDate(date)}
                                                          dateFormat="dd-MM-yyyy"
                                                          className="edit-grid-input"
                                                        />
                                                      ) : (
                                                        ueditedValues[key] !== undefined ? (
                                                          <span>
                                                            <textarea
                                                              type="text"
                                                              value={ueditedValues[key]}
                                                              onChange={(e) => handleInputChange(key, e.target.value)}
                                                              className="edit-grid-input"
                                                            />
                                                          </span>
                                                        ) : (
                                                          <div className=' px-1' onClick={() => handleEditClick(key, value)}>
                                                            <span className=" text-md  ">
                                                              {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                                            </span>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  <div className='px-5 flex'>
                                    <div className='w-3/4'>
                                      <textarea className='w-5/6 h-28 rounded-lg px-2 py-2 bg-slate-200' defaultValue="Enter user comment" id="textareaUser"></textarea>
                                    </div>
                                    <div className='px-4 py-6'>
                                      <button
                                        className='bg-yellow-600 text-white px-10 py-2 rounded-xl'
                                        onClick={() => {
                                          handleSaveClick();
                                        }}
                                      > Update</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      )}
                    </div>

                    {/*update ends here */}

                    {/*edit starts here */}
                    <div>
                      <button
                        onClick={() => openEditModal(index)}
                        className='bg-yellow-600 p-6 text-white px-4 py-2 rounded-lg'
                      >
                        Edit
                      </button>
                      {editModalStates[index] && (
                        <Modal
                          isOpen={true}
                          onRequestClose={() => closeEditModal(index)}
                          contentLabel='Edit Modal'
                        >
                          <div>
                            <div className='flex justify-end'>

                              <button
                                type='button'
                                className='text-2xl font-bold hover:shadow-xl  rounded-2xl p-2 '
                                onClick={() => closeEditModal(index)}
                              >
                                X
                              </button>
                            </div>
                            <div>
                              <div className='flex'>
                                <div className='flex-none p-4'>
                                  <span className='bg-yellow-700 p-6 text-white px-4 py-2 rounded-lg'>
                                    Edit Mode
                                  </span>
                                </div>
                                <div className='flex-grow flex justify-center items-center p-4'>
                                  <div className='mr-10 mb-4  text-2xl font-medium'>
                                    {item.contractName}
                                  </div>
                                </div>
                              </div>
                              {/*edit grid starts here */}
                              <div>
                                <div className="grid grid-cols-4 grid-rows-4">
                                  {Object.entries(item)
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
                                      <div>

                                        <div className="" key={innerIndex}>

                                          <div className="bg-gray-200 w-11/12 h-24  inline-block m-4 py-2 rounded-lg">
                                            <div className="flex-col px-2">
                                              <div className="">
                                                <div className="flex flex-col w-4/5">
                                                  <div className="text-sm  font-bold px-2">
                                                    {aliasNames[key] || key}:
                                                  </div>
                                                  <div className=''>
                                                    {key === 'contractStartDate' || key === 'contractEndDate' ? (
                                                      <DatePicker
                                                        selected={
                                                          key === 'contractStartDate'
                                                            ? econtractStartDate || eparseDate(item[key])
                                                            : econtractEndDate || eparseDate(item[key])
                                                        }
                                                        onChange={(date) => key === 'contractStartDate' ? esetContractStartDate(date) : esetContractEndDate(date)}
                                                        dateFormat="dd-MM-yyyy"
                                                        className="edit-grid-input"
                                                      />
                                                    ) : (
                                                      editedValues[key] !== undefined ? (
                                                        <textarea
                                                          type="text"
                                                          value={editedValues[key]}
                                                          onChange={(e) => ehandleInputChange(key, e.target.value)}
                                                          className="edit-grid-input"
                                                        />
                                                      ) : (
                                                        <div className='hover:text-xl w-full px-2' onClick={() => ehandleEditClick(key, value)}>
                                                          <span className=" text-md"
                                                            style={{ wordBreak: 'break-all', overflowWrap: 'break-word', overflow: 'scroll' }}>
                                                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                                                          </span>
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  <div className='px-5 flex'>
                                    <div className='w-3/4'>
                                      <textarea className='w-5/6 h-28 rounded-lg px-2 py-2 bg-slate-200' defaultValue="Enter user comment" id="textareaUser"></textarea>
                                    </div>
                                    <div className='px-4 py-6'>
                                      <button
                                        className='bg-yellow-600 text-white px-10 py-2 rounded-xl'
                                        onClick={() => {
                                          handleSaveEClick();
                                        }}
                                      > Edit</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>

                      )}
                    </div>
                    {/*edit ends here */}

                  </div>

                </div>
                {/* datagrid for main page starts here */}
                <div className="grid grid-cols-4 grid-rows-4">
                  {Object.entries(item)
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
                      <div>

                        <div className="" key={innerIndex}>

                          <div className="bg-gray-200 w-11/12 h-24  inline-block m-4 py-2 rounded-lg">
                            <div className="flex-col px-2">
                              <div className="">
                                <div className="flex flex-col w-4/5">
                                  <div className="text-sm  font-bold px-2">
                                    {aliasNames[key] || key}:
                                  </div>
                                  <div>
                                    <span
                                      className="p-2 text-md"
                                      style={{
                                        wordBreak: 'break-all',
                                        overflowWrap: 'break-word',
                                        overflow: 'scroll',
                                      }}
                                    >
                                      {typeof value === 'object'
                                        ? JSON.stringify(value, null, 2)
                                        : value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {/*timeline starting */}
                <div className='text-sm px-4 py-5'>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    onClick={handleClick}>
                    Timeline (click to open)
                  </button>
                </div>
                <div className="">

                  {showTimeline &&
                    <div className='px-10'>
                      <ol className="relative border-s py-2 border-gray-200 dark:border-gray-700">
                        <li className='mb-10 ms-6'>
                          {item.updateHistory
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                            .map((historyItem, historyIndex) => (
                              <div key={historyIndex} className='py-4 '>
                                <div className='py-4 px-2'>
                                  <span className="absolute flex items-center justify-center w-6 h-6 
                       bg-blue-100 rounded-xl -start-4   ring-blue  dark:bg-gray-400">

                                    {historyItem.description.toLowerCase().includes('corrected') && (
                                      <EditedSvg />
                                    )}
                                    {historyItem.description.toLowerCase().includes('updated') && (
                                      <UpdatedSvg />
                                    )}
                                    {historyItem.description.toLowerCase().includes('created') && (
                                      <NewContractsvg />
                                    )}
                                  </span>
                                  <div className="items-center justify-between p-5 py-2  border-gray-200 
                        rounded-md shadow-sm sm:flex dark:bg-slate-400 ">



                                    <div className='space-x-2'>

                                      <div className="flex font-medium dark:text-white space-x-2 py-2">
                                        <div className='flex bg-gray-700 rounded-full p-2  py-2'>
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                          </svg>
                                          {historyItem.user}
                                        </div>

                                        <div className='py-2 px-2'>
                                          {historyItem.description.toLowerCase().includes('updated') && (
                                            <span className="bg-blue-500 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-800 dark:text-white">
                                              Update
                                            </span>
                                          )}
                                          {historyItem.description.toLowerCase().includes('corrected') && (
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-500 dark:text-white">
                                              Edit
                                            </span>
                                          )}
                                          {historyItem.description.toLowerCase().includes('created') && (
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-500 dark:text-white">
                                              New
                                            </span>
                                          )}
                                        </div>


                                        <div className='flex justify-center items-center text-black text-sm'>
                                          {historyItem.timestamp}
                                        </div>

                                      </div>
                                      <div className='flex space-x-60'>

                                        <div className=" text-sm py-2 dark:text-gray-400">
                                          <p className='font-bold text-sm text-slate-700'>Description:<br /></p>
                                          <p className='text-black  text-md'> {historyItem.description}</p>

                                          <div className=' py-2 text-black'>
                                            <p className='font-bold text-sm text-slate-700'>Comment:</p>
                                            <p className='text-black text-md '> {historyItem.comment}</p>
                                          </div>

                                        </div>



                                      </div>
                                    </div>


                                  </div>
                                </div>
                              </div>
                            ))}

                        </li>
                        {item.updateHistory && item.updateHistory.length === 0 && (
                          <div className="text-gray-500 dark:text-gray-300">No update history available</div>
                        )}
                      </ol>


                    </div>
                  }
                </div>

              </div>
            ))}
          </div>
        ) : (
          <p>No data available for the selected filters</p>
        )
      ) : (
        <div>

        </div>
      )}
    </div>
  );
};

export default DataGridComponent;
