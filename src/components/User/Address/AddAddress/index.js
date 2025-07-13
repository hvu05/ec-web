// File: Address/index.js
import React, { useState } from 'react';
import axios from 'axios';
import { URL_WEB } from '../../../../constants';
import { message } from 'antd';
import GetAddress from '../GetAddress';
import DataAddress from '../Data';
import './Address.scss'

function Address(props) {
  const userId = props.userId
  console.log('idddd', userId)

  const token = localStorage.getItem('token');

  const [province, setProvince] = useState('');
  const [provinceId, setProvinceId] = useState(0);
  const [district, setDistrict] = useState('');
  const [districtId, setDistrictId] = useState(0);
  const [ward, setWard] = useState('');
  const [wardId, setWardId] = useState(0);
  const [info, setInfo] = useState('');
  const [phone, setPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [showAddress, setShowAddress] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //==================================================================
  const [addAddress, setAddAdddress] = useState(true)
  // If TRUE -> appear form ADD, If FALSE -> appear form EDIT
  //==================================================================
  // Handle address selection from child component
  const handleAddressChange = (selectedProvince, selectedDistrict, selectedWard) => {
    setProvince(selectedProvince.name);
    setProvinceId(selectedProvince.id);
    setDistrict(selectedDistrict.name);
    setDistrictId(selectedDistrict.id);
    setWard(selectedWard.name);
    setWardId(selectedWard.id);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${URL_WEB}/user/${userId}/address`,
        {
          province: province,
          provinceId: provinceId,
          district: district,
          districtId: districtId,
          ward: ward,
          wardId: wardId,
          info: info,
          phone: phone,
          receiverName: receiverName,
          default: isDefault
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success('Post address success');
      setShowForm(false); // Close form after successful submission
      // Reset form
      setProvince('');
      setProvinceId(0);
      setDistrict('');
      setDistrictId(0);
      setWard('');
      setWardId(0);
      setInfo('');
      setPhone('');
      setReceiverName('');
      setIsDefault(true);
    } catch (err) {
      message.error('Post address error');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    // Reset form
    setProvince('');
    setProvinceId(0);
    setDistrict('');
    setDistrictId(0);
    setWard('');
    setWardId(0);
    setInfo('');
    setPhone('');
    setReceiverName('');
    setIsDefault(true);
  };

  return (
    <div className='address-container'>
      {/* Add Address Button */}
      <button
        className="btn btn--primary"
        onClick={() => setShowForm(true)}
      >
        Add Address
      </button>
      {showForm && addAddress && (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <form onSubmit={handleSubmit} className="address-form">
              <div className="form-group">
                <DataAddress onAddressChange={handleAddressChange} />
              </div>

              <div className="form-group">
                <h4 className="info">Address Information</h4>
                <textarea
                  id="info" name="info" value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  placeholder="Enter detailed address information"
                  required
                />
              </div>

              <div className="form-group">
                <h4 className="phone">Phone Number</h4>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <h4 className="receiverName">Receiver Name</h4>
                <input
                  id="receiverName"
                  name="receiverName"
                  value={receiverName}
                  type='text'
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Enter receiver's full name"
                  required
                />
              </div>

              <div className="form-group">
                <h4>
                  <input
                    name="default"
                    type="checkbox"
                    checked={isDefault}
                    onChange={() => setIsDefault(!isDefault)}
                  />
                  Set as default address
                </h4>
              </div>

              <div className="form-actions">
                <button type="submit">Add Address</button>
                <button type="button" onClick={handleCloseForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddress && (
        <div className="address-list">
          <GetAddress userId={userId} />
        </div>
      )}
    </div>
  );
}

export default Address;