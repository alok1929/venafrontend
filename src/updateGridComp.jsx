import React, { useState } from 'react';
import aliasNames from './aliasNames.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateGridComponent = ({ udetailedData, setuDetailedData }) => {
  console.log(udetailedData)
  const [ueditedValues, setUEditedValues] = useState({});
  const [updateHistory, setUpdateHistory] = useState([]);
  const [ueditingKey, setUEditingKey] = useState(null);
  const [contractStartDate, setContractStartDate] = useState(null);
  const [contractEndDate, setContractEndDate] = useState(null);

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
      const updatedDetailedData = udetailedData.map((item) => {
        const newItem = { ...item };
        Object.keys(ueditedValues).forEach((key) => {
          const prevValue = newItem[key];
          const currentValue = ueditedValues[key];
          newItem[key] = currentValue;
  
          const description = `${key} corrected from ${prevValue === undefined ? 'undefined' : prevValue} to ${
            currentValue === undefined ? 'undefined' : currentValue
          }`;
  
          updatedHistory.push({
            user: 'Ravi NM',
            timestamp: new Date().toISOString(),
            description,
            comment: comment || 'Correcting as per contract',
          });
        });
        return newItem;
      });
  
      // Include contractStartDate and contractEndDate in the updatedHistory if they are defined
      if (contractStartDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract Start Date corrected to ${contractStartDate.toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      if (contractEndDate !== null) {
        updatedHistory.push({
          user: 'Ravi NM',
          timestamp: new Date().toISOString(),
          description: `Contract End Date corrected to ${contractEndDate.toLocaleDateString()}`,
          comment: comment || 'Correcting as per contract',
        });
      }
  
      // Update the overall updateHistory state
      setUpdateHistory((prevHistory) => [...prevHistory, ...updatedHistory]);
      console.log('Update History:', updatedHistory);
  
      // Update the detailed data state
      setuDetailedData(updatedDetailedData);
    } catch (error) {
      console.error('Error updating history:', error);
    }
  
    // Handle saving the edited values
    console.log('Saving edited values:', ueditedValues);
    setUEditingKey(null);
  };
  

  return (
    <div>
      {Array.isArray(udetailedData) ? (
        udetailedData.length > 0 ? (
          <div className="">
            {udetailedData.map((item, index) => (
              <div key={index} className="grid grid-cols-4 grid-rows-4">
                {Object.entries(item)
                  .filter(([key, value]) =>
                    value !== 'false' &&
                    key !== 'contractName' &&
                    key !== 'isActive' &&
                    key !== 'updateHistory'
                  )
                  .map(([key, value], innerIndex) => (
                    <div key={innerIndex} className="bg-gray-200 w-11/12 h-24  inline-block m-4 py-2 rounded-lg">
                      <div className="flex-col px-2 ">
                        <div>
                          <div className="flex flex-col">
                            <div className='px-1 text-sm'>{aliasNames[key] || key}:</div>
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
                                  <div className=' w-4/6 px-2' onClick={() => handleEditClick(key, value)}>
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
                  ))}
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
        ) : (
          <p>No data available for the selected filters</p>
        )
      ) : (
        <p className="edit-grid-loading"></p>
      )}
    </div>
  );
};

export default UpdateGridComponent;
