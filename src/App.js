import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DataGridComponent from './dataGridComp';
import EditGridComponent from './EditGridComp';
import UpdateGridComponent from './updateGridComp';
import NewGridComponent from './newGridComp';
import EditedSvg from './editedsvg';
import UpdatedSvg from './updatedsvg';
import NewContractsvg from './newContractsvg';

Modal.setAppElement('#root');

const RegionDropdownComponent = () => {
  const [regionsData, setRegionsData] = useState({});
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('');
  const [contractName, setContractName] = useState('');
  const [econtractName, seteContractName] = useState('');
  const [isActive, setActive] = useState('');
  const [detailedData, setDetailedData] = useState(null);
  const [edetailedData, seteDetailedData] = useState(null);
  const [udetailedData, setuDetailedData] = useState(null);
  const [newdetailedData, setnewDetailedData] = useState(null);
  const [detailedActive, setDetailedActive] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [updatemodalIsOpen, updatesetModalOpen] = useState(false);
  const [newmodalIsOpen, newsetModalOpen] = useState(false);
  const [isSearchPerformed, setSearchPerformed] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState('');
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [collectionData, setCollectionData] = useState([]);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openUpdateModal = () => {
    updatesetModalOpen(true);
  };

  const closeUpdateModal = () => {
    updatesetModalOpen(false);
  };

  const opennewModal = () => {
    newsetModalOpen(true);
  };

  const closenewModal = () => {
    newsetModalOpen(false);
  };

  useEffect(() => {
    // Fetch regions on component mount
    axios.get('http://localhost:3000/getRegions')
      .then(response => setRegions(response.data.regions))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  useEffect(() => {
    // Fetch documents when the selected region changes
    if (selectedRegion) {
      axios.get(`http://localhost:3000/getDocuments/${selectedRegion}`)
        .then(response => setDocuments(response.data.documents))
        .catch(error => console.error('Error fetching documents:', error));
    }
  }, [selectedRegion]);

  useEffect(() => {
    // Fetch collections when the selected document changes
    if (selectedRegion && selectedDocument) {
      axios.get(`http://localhost:3000/getCollections/${selectedRegion}/${selectedDocument}`)
        .then(response => setCollections(response.data.collections))
        .catch(error => console.error('Error fetching collections:', error));
    }
  }, [selectedRegion, selectedDocument]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getCollections/${selectedRegion}/${selectedDocument}/${selectedCollection}`);
      setCollectionData(response.data.collections);


      setShowGrid(true);
      setSearchPerformed(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }

  };


  async function handleSearch() {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.get('/search.json');
      console.log("got search.json");
      let dataForSelectedRegion = response.data.data;

      console.log("this is the total entire data");
      console.log(dataForSelectedRegion);

      if (selectedRegion) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.region === selectedRegion
        );
      }

      if (selectedTechnology) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.technology === selectedTechnology
        );
      }

      if (selectedPlant) {
        dataForSelectedRegion = dataForSelectedRegion.filter(
          (item) => item.plant === selectedPlant
        );

        console.log(dataForSelectedRegion);

        //item.plant name is the plant name in the json data,
        //selectedPlant is the plantname in the dropdown, 
        //and the same for technology and region//
        const activestatus = dataForSelectedRegion.find((item) => item.isActive);
        setActive(activestatus ? activestatus.isActive : '');

        setDetailedData(dataForSelectedRegion);
        const contractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        seteDetailedData(dataForSelectedRegion);
        const econtractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setuDetailedData(dataForSelectedRegion);
        const ucontractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setnewDetailedData(dataForSelectedRegion);
        const newcontractNameItem = dataForSelectedRegion.find(
          (item) => item.contractName
        );
        setContractName(contractNameItem ? contractNameItem.contractName : '');
        setContractName(econtractNameItem ? econtractNameItem.contractName : '');
        setContractName(ucontractNameItem ? ucontractNameItem.contractName : '');
        setContractName(newcontractNameItem ? newcontractNameItem.contractName : '');


        setShowGrid(true);
        setSearchPerformed(true);
        setIsLoading(false);

      }
    } catch (error) {
      console.error('Error fetching detailed data:', error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center p-6 font-medium text-2xl bg-slate-200 px-12'>
        Contracts & Warranties
      </div>
      <div className='flex justify-center items-center py-10 space-x-20 bg-slate-200'>
        <label htmlFor='regions' className=''></label>
        <select
          id='regions'
          value={selectedRegion}
          className='rounded-lg p-3'
          onChange={(e) => setSelectedRegion(e.target.value)}

        >
          <option value='' className=''>
            Region
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label htmlFor='technologies'></label>
        <select
          id='technologies'
          className='rounded-lg p-3'
          value={selectedDocument}
          onChange={(e) => setSelectedDocument(e.target.value)}
        >
          <option value=''>Technology</option>
          {documents.map((document) => (
            <option key={document} value={document}>
              {document}
            </option>
          ))}
        </select>

        <label htmlFor='plants'></label>
        <select
          id='plants'
          className='rounded-lg p-3'
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value=''>Plants</option>
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>

        <div className='px-5'>
          <button
            className='text-white
           bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            onClick={fetchData}
          >
            Search
          </button>
        </div>
      </div>
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
                  <div className='flex'>
                    <div className='flex-none p-4'>
                      <span className='bg-gray-500 p-6 text-white px-4 py-2 rounded-xl'>
                        Create Contract Mode
                      </span>
                    </div>
                    <div className='flex-grow flex justify-center items-center p-4'>
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


      <DataGridComponent collectionData={collectionData} />

    </div>


  );
};

export default RegionDropdownComponent;