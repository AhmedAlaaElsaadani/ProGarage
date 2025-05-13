import axios from "axios";
const baseUrl = "https://api.progarage.store";
const getHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };
};
export default class ApiManager {
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

  /**
   * get user Book
   * @param {string} token
   * @returns
   */
  static async GetMyCourses(token) {
    const axiosResult = await axios.get(baseUrl + "/courses/mine", {
      headers: getHeaders(token), // Correct usage in axios
    });

    return axiosResult;
  }
  /**
   * get user Book
   * @param {String} token
   * @returns
   */
  static async GetMyBooks(token) {
    const response = await axios.get(baseUrl + "/books/mine", {
      headers: getHeaders(token),
    });
    return response;
  }
  /**
   * get user Certificates
   * @param {string} token
   * @returns {object} response
   */
  static async GetMyCertificates(token) {
    const axiosResult = await axios.get(baseUrl + "/certificates", {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * download certificate
   * @param {string} token
   * @param {string} certificateId
   * @returns {object} response
   */
  static async downloadCertificate(certificateId) {
    const axiosResult = await axios.get(
      baseUrl + `/certificates/save-as-pdf/${certificateId}`,
      {
        headers: getHeaders(),
        responseType: "blob",
      }
    );
    return axiosResult;
  }
  /**
   * check if certificate is valid
   * @param {string} token
   * @param {string} certificateId
   * @returns {object} response
   */
  static async checkIfCertificateIsValid(certificateId) {
    const axiosResult = await axios.get(
      baseUrl + `/certificates/${certificateId}/validate`,
      {
        headers: getHeaders(),
      }
    );
    return axiosResult;
  }
  /**
   * get user Book
   * @param {string} token
   * @returns {object} response
   */
  static async getUserBook(token) {
    const axiosResult = await axios.get(baseUrl + "/books/mine", {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * get ge the history of orders
   * @param {string} token
   * @returns {object} response
   */
  static async getTheHistoryOfOrders(token) {
    const axiosResult = await axios.get(baseUrl + "/orders/history", {
      headers: getHeaders(token),
    });
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

  /********************online Study Page****************************/
  ////////////Parent/////////////
  // online Student <-- register new student, get All Students of parent, edit online student, get online student plans, login student by Parent -->
  /**
   *
   * @param {object} student
   * @returns {object} response
   */
  static async registerNewStudent(student, token) {
    const axiosResult = await axios.post(baseUrl + "/online-edu", student, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * get All Students of parent
   * @param {string} token
   * @returns {object} response
   */
  static async getAllOnlineStudents(token) {
    const axiosResult = await axios.get(baseUrl + "/online-edu", {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   *
   * @param {string} studentId
   * @param {string} token
   * @param {object} studentData
   * @returns {object} response
   */
  static async editOnlineStudent(studentId, token, studentData) {
    const axiosResult = await axios.put(
      `${baseUrl}/online-edu/${studentId}`,
      studentData,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get online student info
   * @param {string} studentId
   * @param {string} token
   * @returns {object} response
   */
  static async getOnlineStudentPlans(token, lng, eduLevel) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${lng}/plans/${eduLevel}`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * login student by Parent
   * @param {string} token
   * @param {string} studentId
   * @returns {object} response
   */
  static async loginStudentByParent(token, studentId) {
    const axiosResult = await axios.post(
      baseUrl + `/online-edu/login-as-parent/${studentId}`,
      {},
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * ask For free Session
   * @param {string} token
   * @param {string} studentId
   * @param {string} notes
   * @returns
   */
  static async askForFreeSession(token, studentId, notes) {
    const axiosResult = await axios.post(
      baseUrl + `/online-edu/request-free-session`,
      {
        StudentId: studentId,
        Notes: notes,
      },
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  //////////////Student///////////////
  // online Student <-- login Student, get online student info, getMyLessons, getMySchedule, geTheWholeScheduleForTheLesson, askForSessionExcuse, getMyChats, sendMessage  -->
  /**
   * login student to online study
   * @param {object} student
   * @returns {object} response
   */
  static async loginStudent(student) {
    const axiosResult = await axios.post(
      baseUrl + "/online-edu/login",
      student,
      {
        headers: getHeaders(),
      }
    );
    return axiosResult;
  }
  /**
   * get online student info
   * @param {string} token
   * @returns {object} response
   */
  static async getOnlineStudentInfo(token) {
    const axiosResult = await axios.get(baseUrl + "/online-edu/profile", {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * get online student lessons
   * @param {string} token
   * @param {string} lng
   * @returns {object} response
   */
  static async getMyLessons(token, lng) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${lng}/subscriptions`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get online student Dates
   * @param {string} token
   * @param {string} lng
   * @returns {object} response
   */
  static async getMySchedule(token, lng) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${lng}/subscriptions/sessions/`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get online student Dates
   * @param {string} token
   * @param {string} lng
   * @param {string} lessonId
   * @returns {object} response
   */
  static async geTheWholeScheduleForTheLesson(token, lng, lessonId) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${lng}/subscriptions/${lessonId}`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }

  /**
   * ask for session excuse
   * @param {string} token
   * @param {string} Excuse
   * @param {string} SessionId
   * @param {string} SubscriptionId
   * @returns {object} response
   *
   */
  static async askForSessionExcuse(token, Excuse, SessionId, SubscriptionId) {
    const axiosResult = await axios.post(
      baseUrl + "/online-edu/subscriptions/excuse",
      {
        Excuse,
        SessionId,
        SubscriptionId,
      },
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * start session zoom
   * @param {string} token
   * @param {string} SubscriptionId
   * @param {string} SessionId
   * @returns response
   */
  static async startZoomSession(token, SubscriptionId, SessionId) {
    const axiosResult = axios.get(
      baseUrl + `/online-edu/${SubscriptionId}/start-session/${SessionId}`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get online student Chats
   * @param {string} token
   * @param {string} chatId
   * @returns {object} response
   * //not Done
   */
  static async getMyChats(token, chatId) {
    const axiosResult = await axios.get(baseUrl + `/online-chat/${chatId}`, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /**
   * send message by online student
   * @param {string} token
   * @param {object} message
   * @returns {object} response
   * //not Done
   */
  static async sendMessage(token, message) {
    const axiosResult = await axios.post(
      baseUrl + "/online-chat/sendMessage",
      message,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /********************Cart Page****************************/
  // payment Api <-- getPaymentMethods,  -->
  /**
   * get payment methods
   * @returns {object} response
   */
  static async getPaymentMethods() {
    const axiosResult = await axios.get(baseUrl + "/cart/payment-methods", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * create a payment
   * @param {object} data
   * @param {string} token
   * @returns {object} response
   *
   */
  static async createPayment(data, token) {
    const axiosResult = await axios.post(baseUrl + "/orders", data, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }

  // unAuthorized services Api <-- Home , contactUs, getAllTeachers, getTeacherProfile, getAllBooksCategories, getAllBooks, getAllArticles, getArticleDetails, getAllJobs, getJobDetails, applyToJob-->
  /********************Home Page****************************/
  // Home Page <-- Get Home Data, Contact Us -->
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
  /**
   * get About Content
   * @returns
   */
  static async getAboutData() {
    const axiosResult = await axios.get(baseUrl + "/home/about-platform", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
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
  /**
   * @param {string} Type
   * @param {string} itemId
   * @param {string} token
   * @returns {object} response
   */
  static async buyFreeItem(token, Type, itemId) {
    const raw = JSON.stringify({
      ItemId: itemId,
      Type: Type,
    });
    const axiosResult = await axios.post(baseUrl + "/orders/free-item", raw, {
      headers: getHeaders(token),
    });
    return axiosResult;
  }
  /********************Teacher Page****************************/
  // Teacher Apis <-- Get All Teachers, Get Teacher Profile -->
  /**
   * get all teachers
   * @returns {object} response
   */
  static async getAllTeachers() {
    const axiosResult = await axios.get(baseUrl + "/teachers", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * get teacher Profile
   * @param {string} teacherId
   * @returns {object} response
   */
  static async getTeacherProfile(teacherId) {
    const axiosResult = await axios.get(baseUrl + "/teachers/" + teacherId, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /********************Books Page****************************/
  // Books Apis <-- Get All Books, Get All Books Categories -->
  /**
   * get all Books Categories
   * @returns {object} response
   */
  static async getAllBooksCategories() {
    const axiosResult = await axios.get(baseUrl + "/books/categories", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * get all Books
   * @param {string} param
   * @returns {object} response
   */
  static async getAllBooks(param) {
    const axiosResult = await axios.get(baseUrl + "/books" + param, {
      headers: getHeaders(),
    });

    return axiosResult;
  }
  /********************Articles Page****************************/
  // Articles Apis <-- Get All Articles , Get Article Details -->
  /**
   * Get All Articles
   * @param {string} param
   * @returns {object} response
   */
  static async getArticles(param = "") {
    const axiosResult = await axios.get(baseUrl + "/blogs" + param, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * GET Article Details
   * @param {string} blogId
   * @returns {object} response
   */
  static async getArticleDetails(blogId) {
    const axiosResult = await axios.get(baseUrl + "/blogs/" + blogId, {
      headers: getHeaders(),
    });
    return axiosResult;
  }

  /********************Jobs Page****************************/
  // Jobs Apis <-- Get All Jobs, Get Job Details, Apply To Job -->
  /**
   * Get All Jobs
   * @returns {object} response
   * */
  static async getAllJobs() {
    // param
    const axiosResult = await axios.get(
      baseUrl + "/jobs",
      // + param
      {
        headers: getHeaders(),
      }
    );
    return axiosResult;
  }
  /**
   * Get Job Details
   * @param {string} jobId
   * @returns {object} response
   * */
  static async getJobDetails(jobId) {
    const axiosResult = await axios.get(baseUrl + "/jobs/" + jobId, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   *
   * @param {object} request
   * @returns {object} response
   */
  static async applyToJob(request, jobId) {
    const formdata = new FormData();
    formdata.append("name", request.name);
    formdata.append("email", request.email);
    formdata.append("phone", request.phone);
    formdata.append("gender", request.gender);
    formdata.append("years", request.years);
    formdata.append("cv", request.cv);
    const axiosResult = await axios.post(
      baseUrl + `/jobs/${jobId}/apply`,
      formdata,
      {
        headers: {
          ...getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return axiosResult;
  }
  /****************** Course Pages **************** */
  // Course Apis <-- Get Popular Courses, Get Categories, Search Courses, getCourseDetails, MakeARate -->
  /**
   * get Popular Courses
   * @returns {object} response
   */

  static async getPopularCourses() {
    const axiosResult = await axios.get(baseUrl + "/courses/popular", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * get Popular Courses
   * @returns {object} response
   */

  static async getCategories() {
    const axiosResult = await axios.get(baseUrl + "/courses/categories", {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * Search Courses
   * @param {string} param
   * @returns {object} response
   */
  static async searchCourses(param) {
    const axiosResult = await axios.get(baseUrl + "/courses" + param, {
      headers: getHeaders(),
    });
    return axiosResult;
  }
  /**
   * Search Courses
   * @param {string} param
   * @returns {object} response
   */
  static async getCourseDetails(courseId, token) {
    const response = await axios.get(`${baseUrl}/courses/${courseId}/details`, {
      headers: getHeaders(token),
    });
    return response;
  }
  /**
   * Make a rate
   *
   * @param {string} token
   * @returns {object} response
   */
  static async MakeARate(token, CoursePath, ratingData) {
    const axiosResult = await axios.post(
      baseUrl + `/courses/${CoursePath}/rate`,
      ratingData,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get course content
   *
   * @param {string} CoursePath
   * @returns {object} response
   */
  static async GetContentCourse(token, CoursePath) {
    const response = await axios.get(
      `${baseUrl}/courses/${CoursePath}/content`,
      {
        headers: getHeaders(token),
      }
    );
    return response;
  }
  /**
   *
   * @param {string} token
   * @param {string} courseId
   * @param {string} unitvideoIndex
   * @param {string} videoIndex
   * @returns
   */
  static async GetVideoDetails(
    token,
    courseId,
    courseUnitOrderIndex,
    orderIndex
  ) {
    const response = await axios.get(
      `${baseUrl}/courses/${courseId}/units/${courseUnitOrderIndex}/videos/${orderIndex}`,
      {
        headers: getHeaders(token),
      }
    );
    return response;
  }
  /**
   * add comment
   *
   * */
  static async addComment(token, courseId, comment) {
    try {
      const response = await axios.post(
        `${baseUrl}/courses/${courseId}/comment`,
        comment, // The comment body
        {
          headers: getHeaders(token),
        }
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      throw error;
    }
  }
  /**
   * Delete comment
   *
   * */
  static async deleteComment(token, courseId, commentId) {
    try {
      const response = await axios.delete(
        `${baseUrl}/courses/${courseId}/comment/${commentId}`,
        {
          headers: getHeaders(token),
        }
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      throw error;
    }
  }
  /**
   *  Update comment
   *  @param {string} token
   *  @param {string} courseId
   *  @param {string} commentId
   **/
  static async updateComment(token, courseId, comment) {
    try {
      const response = await axios.put(
        `${baseUrl}/courses/${courseId}/comment`,
        comment, // The comment body
        {
          headers: getHeaders(token),
        }
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      throw error;
    }
  }
  /**
   *
   * @param {string} token
   * @param {string} coursePath
   * @returns {object} axiosResponse
   */
  static async completeCourseAndExportCertificate(token, coursePath) {
    const axiosResponse = await axios.post(
      `${baseUrl}/courses/${coursePath}/complete`,
      {},
      {
        headers: getHeaders(token),
      }
    );
    return axiosResponse;
  }

  /****************** Exam Pages **************** */
  // Exam Apis <--getAllExams, starExam , submitExam , getExamDetails, getExamAttempts -->
  /**
   * getAllExams
   * @param {string} token
   * @param {string} SubscriptionId
   * @returns {object} response
   */
  static async getAllExams(token, SubscriptionId) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${SubscriptionId}/exams`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * starExam
   * @param {object} examObject
   * {"CoursePath", // required if ExamSource was 1,"SubscriptionPlanId": 5,// required if ExamSource wan not 1,"ExamSource": 2// required}
   * @param {string} token
   * @param {string} examId
   * @returns {object} response
   */
  static async starExam(token, examObject, examId) {
    let requestBody = {
      CoursePath:
        examObject.coursePath == undefined ? null : examObject.coursePath, // required if ExamSource was 1,
      SubscriptionPlanId:
        examObject.subscriptionPlanId == undefined
          ? null
          : Number(examObject.subscriptionPlanId), // required if ExamSource wan not 1,
      ExamSource: examObject.examSource, // required
    };
    const axiosResult = await axios.post(
      baseUrl + `/exams/${examId}/start`,
      requestBody,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * submitExam
   * @param {object} answerObject
   * @param {string} token
   * @param {string} examId
   * @param {string} attemptId
   * @returns {object} response
   */
  static async submitExam(token, answerObject, examId, attemptId) {
    const axiosResult = await axios.post(
      baseUrl + `/exams/${examId}/submit/${attemptId}`,
      answerObject,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get Exam Details
   * @param {string} token
   * @param {string} attemptId
   * @returns {object} response
   */
  static async getExamDetails(token, attemptId) {
    const axiosResult = await axios.get(
      baseUrl + `/exams/attempts/${attemptId}`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  /**
   * get Exam Attempts
   * @param {string} token
   * @param {string} subscriptionPlanId
   * @param {string} examId
   * @returns {object} response
   */
  static async getExamAttempts(token, subscriptionPlanId, examId) {
    const axiosResult = await axios.get(
      baseUrl + `/online-edu/${subscriptionPlanId}/exam-attempts/${examId}`,
      {
        headers: getHeaders(token),
      }
    );
    return axiosResult;
  }
  ///////////////ProGarage App/////////////////////
  //UnAuthorized Apis <--- ContactUs --->
  // Contact us
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
}
