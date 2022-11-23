import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import Header from './Header';
import styled from 'styled-components';

const columns = [
  {
      name: 'Log ID',
      selector: row => row.logId,
      sortable: true,
  },
  {
      name: 'Application Type',
      selector: row => row.applicationType,
      sortable: true,
  },
  {
      name: 'Application ID',
      selector: row => row.applicationId,
      sortable: true,
  },
  {
      name: 'Action',
      selector: row => row.actionType,
      sortable: true,
  },
  {
      name: 'Action Details',
      selector: row => "-/-",
  },
  {
      name: 'Date:Time',
      selector: row => row.creationTimestamp,
      sortable: true,
  },
];

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const FilterComponent = ({ filterText, onFilter }) => (
	<>
		<TextField
			id="search"
			type="text"
			placeholder="Filter By Action"
			aria-label="Search Input"
			value={filterText}
			onChange={onFilter}
		/>

	</>
);

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const [search, setSearch] = useState("")
  const [startDate, setStartDate]= useState("");
  const [endDate, setEndDate] = useState("");
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    fetchData(1);
  })

  const fetchData = async () => {
    fetch(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
      .then(res => res.json())
      .then(
        (response) => {
          setIsLoaded(true);
          setItems(response.result.auditLog);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }


  const filteredItems = items.filter(
		item => item.actionType && item.actionType.toLowerCase().includes(filterText.toLowerCase()),
	);

  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <Header setSearch={setSearch} items={items} setEndDate={setEndDate} setStartDate={setStartDate} setIsSearch={setIsSearch}/>
        
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination="true"
          paginationResetDefaultPage={resetPaginationToggle} 
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </div>
      
    );
  }
}

export default App;
