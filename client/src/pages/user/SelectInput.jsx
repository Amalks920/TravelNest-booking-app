import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updatePriceRange } from "../../services/searchSlice";

export function SelectInput() {
  // State to track the selected price range as an object with min and max
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const dispatch=useDispatch()

  const handleSelect = (value) => {
    // Map the selected value to corresponding min and max values
    const rangeMapping = {
      "₹0 - ₹1000": { min: 0, max: 1000 },
      "₹1000 - ₹5000": { min: 1000, max: 5000 },
      "₹5000 - ₹10000": { min: 5000, max: 10000 },
      "₹10000 - ₹20000": { min: 10000, max: 20000 },
      "₹20000+": { min: 20000, max: Infinity },
    };

    // Update state with the corresponding min and max for the selected range
    setPriceRange(rangeMapping[value]);
    dispatch(updatePriceRange(rangeMapping[value]))
  };

  return (
    <div className="w-full">
      <Select 
        label="Select Price Range" 
        onChange={(e) => handleSelect(e)}>
        <Option value="₹0 - ₹1000">₹0 - ₹1000</Option>
        <Option value="₹1000 - ₹5000">₹1000 - ₹5000</Option>
        <Option value="₹5000 - ₹10000">₹5000 - ₹10000</Option>
        <Option value="₹10000 - ₹20000">₹10000 - ₹20000</Option>
        <Option value="₹20000+">₹20000+</Option>
      </Select>
    </div>
  );
}

