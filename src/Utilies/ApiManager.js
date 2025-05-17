import axios from "axios";
const baseUrl = "https://api.progarage.store";
const getHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };
};
export default class ApiManager {
  ///////////////ProGarage App/////////////////////
  /************************ Profile Apis ************************ */
  // Authorized services Apis
  // profile Apis <-- updateProfile, getProfile, updateEmail, checkIfSessionValid,  -->
  /**
   * Update Profile
   * @param {object} user
   * @param {string} token
   * @returns {object} response
   *
   */
  static async updateProfile(user, token) {
    const axiosResult = await axios.put(
      baseUrl + "/accounts/update-profile",
      user,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * @param {string} token
   * @param {File} image
   * @returns {object}
   */
  static async updateImage(token, image) {
    const formdata = new FormData();

    formdata.append("image", image);
    const axiosResult = await axios.put(
      baseUrl + "/accounts/update-profile-image",
      formdata,
      {
        headers: {
          ...getHeaders(token),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return axiosResult;
  }

  /**
   * Get Profile
   * @param {string} token
   * @returns {object} response
   */
  static async getProfile(token) {
    const axiosResult = await axios.get(`${baseUrl}/auth/current`, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * update Email
   * @param {string} email
   * @param {string} token
   * @returns {object} response
   */
  static async updateEmail(email, token) {
    const axiosResult = await axios.post(
      baseUrl + `/auth/change-email?email=${email}`,
      {},
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * check if session is still valid
   * @param {string} token
   */
  static async checkIfSessionValid(token) {
    const axiosResult = await axios.post(
      baseUrl + "/auth/validate",
      {},
      {
        headers: getHeaders(token),
      }
    );

    return axiosResult;
  }

  /********************Login Register Page****************************/
  // login Apis <-- Logout, Login, Register, sendOtp, otpConfirm, forgotPasswordSendOtpToEmail, confirmOtpForResetPassword, resetPassword -->

  /**
   * log out user
   *
   * @param {string} token
   * @returns {object} response
   */
  static async logOut(token) {
    const axiosResult = await axios.post(
      baseUrl + "/auth/logout",
      {},
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * log in user
   * @param {object} user
   * @returns {object} response
   */
  static async login(user) {
    const axiosResult = await axios.post(baseUrl + "/auth/login", user, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * register user
   * @param {object} user
   * @returns {object} response
   *
   */

  static async register(user) {
    const axiosResult = await axios.post(baseUrl + "/auth/register", user, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * Otp send confirmation
   * @param {string} token
   * @returns {object} response
   */
  static async sendOtp(token) {
    const axiosResult = await axios.post(
      baseUrl + "/auth/SendOTPConfirmAccount",
      {},
      {
        headers: getHeaders(token),
      }
    );

    return axiosResult;
  }
  /**
   * Otp Confirm
   * @param {object} user
   * @returns {object} response
   */
  static async otpConfirm(otp, token) {
    const axiosResult = await axios.post(
      baseUrl + `/auth/ConfirmAccountOTP?otp=${otp}`,
      {},
      { headers: getHeaders(token) }
    );
    return axiosResult;
  }
  /**
   * send email to send reset password otp to user
   * @param {string} email
   * @returns {object} response
   *
   */
  static async forgotPasswordSendOtpToEmail(email) {
    const axiosResult = await axios.post(
      baseUrl + `/auth/SendOTPResetPassword?email=${email}`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return axiosResult;
  }
  /**
   * confirm otp for reset password
   * @param {string} otp
   * @param {string} email
   * @returns {object} response
   */
  static async confirmOtpForResetPassword(otp, email) {
    const axiosResult = await axios.post(
      baseUrl + `/auth/ConfirmResetPasswordOTP?OTP=${otp}&email=${email}`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return axiosResult;
  }
  /**
   * reset password
   * @param {object} data
   * @returns {object} response
   */
  static async resetPassword(email, password, token) {
    const data = {
      email: email,
      newPassword: password,
      token: token,
    };

    const axiosResult = await axios.post(
      baseUrl + `/auth/ResetPassword`,
      data,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * update password
   * @param {object} password
   * @param {string} token
   */
  static async updatePassword(password, token) {
    const axiosResult = await axios.post(
      baseUrl + `/auth/change-password`,
      password,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }

  /********************Cart Page****************************/

  // unAuthorized services Api <-- Home , contactUs, askForRepair-->
  /********************Home Page****************************/
  // Home Page <-- Get Home Data, Contact Us, getProducts -->
  /**
   * get home data
   * @returns {object} response
   */
  static async getHomeData() {
    const axiosResult = await axios.get(baseUrl + "/home", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /********************Contact Page****************************/
  /**
   * Contact us
   * @param {object} data
   * @returns {object} response
   *
   */
  static async contactUs(data) {
    const config = {
      headers: getHeaders(),
    };
    const axiosResult = await axios.post(baseUrl + "/contact-us", data, config);

    return axiosResult;
  }
  /********************Products Page****************************/

  /**
   * Get Products with filters and pagination
   * @param {object} filters - Filter and pagination parameters
   * @param {string} token - Auth token
   * @returns {Promise<object>}
   */
  static async getProducts(filters, token) {
    const response = await axios.get(`${baseUrl}/products`, {
      headers: getHeaders(token),
      params: {
        Id: filters.Id || "",
        CategoryId: filters.CategoryId || "",
        Year: filters.Year || "",
        BrandId: filters.BrandId || "",
        TypeId: filters.TypeId || "",
        Transmission: filters.Transmission || "",
        PageIndex: filters.PageIndex ?? 1,
        PageSize: filters.PageSize ?? 12,
      },
    });

    return response;
  }
  /**
   * Get Brands
   * @param {string} token
   * @returns {Promise<object>}
   */
  static async getBrands(token) {
    const response = await axios.get(`${baseUrl}/brands`, {
      headers: getHeaders(token),
    });
    return response;
  }

  /**
   * Get Types
   * @param {string} token
   * @returns {Promise<object>}
   */
  static async getTypes(token) {
    const response = await axios.get(`${baseUrl}/types`, {
      headers: getHeaders(token),
    });
    return response;
  }

  /**
   * Get Categories
   * @param {string} token
   * @returns {Promise<object>}
   */
  static async getCategories(token) {
    const response = await axios.get(`${baseUrl}/categories`, {
      headers: getHeaders(token),
    });
    return response;
  }
  /********************Basket Page****************************/
  // Basket Apis <-- Open Basket, get Basket Data, Update Basket, Deconste Basket -->
  /**
   * Open Basket
   * @returns {object} response
   */
  static async openBasket() {
    const axiosResult = await axios.get(baseUrl + "/cart", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * get basket data
   * @param {string} basketId
   * @returns {object} response
   */
  static async getBasketData(basketId, token) {
    const axiosResult = await axios.get(baseUrl + "/cart/" + basketId, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * @param {string} basketId
   * @param {object} basket
   * @returns {object} response
   */
  static async updateBasket(basketId, basket) {
    const axiosResult = await axios.post(
      baseUrl + "/cart/" + basketId,
      basket,
      {
        headers: getHeaders(),
      }
    );
    return axiosResult;
  }
  /**
   * deconste basket
   * @param {string} basketId
   * @returns {object} response
   * */
  static async deleteBasket(basketId) {
    const axiosResult = await axios.delete(baseUrl + "/cart/" + basketId, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   *
   * @param {string} basketId
   * @param {string} couponCode
   * @returns
   */
  static async addCoupon(basketId, couponCode) {
    const axiosResult = await axios.post(
      baseUrl + "/cart/coupons/" + basketId + "/" + couponCode,
      {},
      {
        headers: getHeaders(),
      }
    );
    return axiosResult;
  }
  /********************Ask For repair Page****************************/

  /**
   * Ask for Repair
   * @param {object} params
   * @param {string} params.LocationLongitude
   * @param {string} params.LocationLatitude
   * @param {string} params.LocationDescription
   * @param {string} params.PhoneNumber
   * @param {string} params.ProblemDescription
   * @param {File[]} params.Images
   * @param {string} token
   * @returns {Promise<object>} response
   */
  static async askForRepair(params, token) {
    const formData = new FormData();
    formData.append("LocationLongitude", params.LocationLongitude);
    formData.append("LocationLatitude", params.LocationLatitude);
    formData.append("LocationDescription", params.LocationDescription);
    formData.append("PhoneNumber", params.PhoneNumber);
    formData.append("ProblemDescription", params.ProblemDescription);

    params.Images.forEach((file) => {
      formData.append("Images", file);
    });

    const response = await axios.post(`${baseUrl}/repair-request`, formData, {
      headers: getHeaders(token),
    });

    return response;
  }

  /**
   * Get Repair Requests
   * @param {string} token
   * @returns {Promise<object>}
   */
  static async getRepairRequests(token) {
    const response = await axios.get(`${baseUrl}/repair-request`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  }
  /**
   * Delete Repair Request by ID
   * @param {string} token - Authorization token
   * @param {string} requestId - ID of the repair request to delete
   * @returns {Promise<object>}
   */
  static async cancelRepairRequest(token, requestId) {
    const response = await axios.delete(
      `${baseUrl}/repair-request/${requestId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          // Only include Cookie if actually required and safe
          // Cookie: ".AspNetCore.Identity.Application=...; refreshToken=..."
        },
        withCredentials: true, // if backend requires sending cookies
      }
    );

    return response;
  }
  /********************my Order Page****************************/
  /**
   * Get All Orders
   * @param {string} token
   * @returns {Promise<object>}
   */
  static async getAllOrders(token) {
    const response = await axios.get(`${baseUrl}/orders`, {
      headers: getHeaders(token),
    });
    return response;
  }

  /**
   * Get Order by ID
   * @param {string} token
   * @param {number|string} orderId
   * @returns {Promise<object>}
   */
  static async getOrderById(token, orderId) {
    const response = await axios.get(`${baseUrl}/orders/${orderId}`, {
      headers: getHeaders(token),
    });
    return response;
  }
}
