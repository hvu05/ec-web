// File: Address/Data/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL_WEB } from '../../../../constants';
import './Data.scss'

function DataAddress({ onAddressChange }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${URL_WEB}/address/province`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProvinces(res.data.data);
    });
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict('');
    setSelectedWard('');
    setWards([]);
    axios.get(`${URL_WEB}/address/${provinceId}/district`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setDistricts(res.data.data);
    });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard('');
    axios.get(`${URL_WEB}/address/${districtId}/ward`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setWards(res.data.data);
    });
  };

  const handleWardChange = (e) => {
    const wardName = e.target.value;
    setSelectedWard(wardName);

    // console.log('id pro', selectedProvince)
    const selectedProvinceObj = provinces.find(p => p.provinceID == selectedProvince);
    const selectedDistrictObj = districts.find(d => d.districtID == selectedDistrict);
    const selectedWardObj = wards.find(w => w.wardName == wardName);

    // console.log('find', selectedProvinceObj, selectedDistrictObj, selectedWardObj)
    if (onAddressChange) {
      onAddressChange(
        {
          id: selectedProvinceObj?.provinceID,
          name: selectedProvinceObj?.provinceName
        },
        {
          id: selectedDistrictObj?.districtID,
          name: selectedDistrictObj?.districtName
        },
        {
          id: selectedWardObj?.wardCode,
          name: selectedWardObj?.wardName
        }
      );
    }
  };

  return (
    <div className="data-address-selects">
      <div>
        <div className='label'>Enter province</div>
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Select Province</option>
          {provinces.map(p => (
            <option key={p.provinceID} value={p.provinceID}>{p.provinceName}</option>
          ))}
        </select>
      </div>

      <div>
        <div className='label'>Enter district</div>
        <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.districtID} value={d.districtID}>{d.districtName}</option>
          ))}
        </select>
      </div>

      <div>
        <div className='label'>Enter ward</div>
        <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
          <option value="">Select Ward</option>
          {wards.map(w => (
            <option key={w.wardCode} value={w.wardName}>{w.wardName}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DataAddress;
