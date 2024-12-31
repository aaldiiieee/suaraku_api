import axios from "axios";

export const getProvinces = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.SUARAKU_REGION_SERVICE_URL}/api/provinces.json`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch provinces");
    }

    res.status(200).json({
      message: "Provinces fetched successfully",
      status: 200,
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch provinces",
      status: 500,
      success: false,
    });
  }
};

export const getCities = async (req, res) => {
  const { provinceId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SUARAKU_REGION_SERVICE_URL}/api/regencies/${provinceId}.json`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch cities");
    }

    res.status(200).json({
      message: "Cities fetched successfully",
      status: 200,
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch cities",
      status: 500,
      success: false,
    });
  }
};

export const getDistricts = async (req, res) => {
  const { cityId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SUARAKU_REGION_SERVICE_URL}/api/districts/${cityId}.json`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch districts");
    }

    res.status(200).json({
      message: "Districts fetched successfully",
      status: 200,
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to fetch districts",
      status: 500,
      success: false,
    });
  }
};
