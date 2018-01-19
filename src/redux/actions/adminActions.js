const action = {
  fetchHomework: ()=> {
    const payload = {homework: {interviewer: "siqi"}};
    return {
      type: "FETCH_HOMEWORK",
      payload
    };
  }
};

export default action;