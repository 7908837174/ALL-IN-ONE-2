import React, { useState, useEffect } from 'react';

// Fixed class component example
class MyClassComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    incrementCount = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}

// Fixed functional component with proper hooks
const CountryFilter = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    // Fixed the filter logic with proper variable names and method spelling
    useEffect(() => {
        const filtered = countries.filter(c =>
            c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [countries, searchTerm]);

    // Fixed useEffect with proper implementation
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {filteredCountries.map(country => (
                    <div key={country.cca3}>
                        {country.name.common}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { MyClassComponent, CountryFilter };
export default CountryFilter;
