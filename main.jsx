 import React, { useState, useEffect } from 'react';
import { Search, Globe, Users, MapPin, Loader } from 'lucide-react';

const CountryExplorer = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error(`HTTP error | status: ${response.status}`);
        }
        const data = await response.json();
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
        setError(null);
      } catch (error) {
        setError('Failed to fetch countries data. Please try again later.');
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const formatPopulation = (population) => {
    return population ? population.toLocaleString() : 'N/A';
  };

  const getCapital = (capital) => {
    if (!capital || capital.length === 0) return 'N/A';
    return Array.isArray(capital) ? capital[0] : capital;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center">
          <Globe className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Country Explorer</h1>
        </div>
      </header>

      <div className="relative max-w-md mx-auto mt-6">
        <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            className="bg-white rounded-xl shadow-md overflow-hidden p-4"
          >
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-32 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {country.name.common}
            </h2>
            <p className="text-gray-600">
              <strong>Capital:</strong> {getCapital(country.capital)}
            </p>
            <p className="text-gray-600">
              <strong>Population:</strong> {formatPopulation(country.population)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryExplorer;
