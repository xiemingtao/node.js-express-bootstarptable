  module.exports = {
    format:function (str) {
      var year = str.getFullYear();
      var month =
        str.getMonth() + 1 > 9 ? str.getMonth() + 1 : "0" + (str.getMonth() + 1);
      var date = str.getDate() > 9 ? str.getDate() : "0" + str.getDate();
      var hours = str.getHours() > 9 ? str.getHours() : "0" + str.getHours();
      var minutes =
        str.getMinutes() > 9 ? str.getMinutes() : "0" + str.getMinutes();
      var seconds =
        str.getSeconds() > 9 ? str.getSeconds() : "0" + str.getSeconds();
    
      return (
        year + "-" +month + "-" + date +" " +hours +":" +minutes +":" +seconds
      );
    }
  }