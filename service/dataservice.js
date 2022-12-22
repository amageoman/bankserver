
const jwt = require('jsonwebtoken')
userDetails = {
  1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
  1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }
}

//register

register = (acno, uname, psw) => {

  if (acno in userDetails) {
    return {
      statusCode: 401,
      status: false,
      message: "user already exist"

    };
  }
  else {
    userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] };

    return {
      statusCode: 200,
      status: true,
      message: "registration success"

    };
  }
}


// login


login = (acno, psw) => {


  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      const token = jwt.sign({ currentacno: acno }, 'secretkey123')

      return {
        statusCode: 200,
        status: true,
        message: 'login success',
        token
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password'

      };
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: 'incorrect account number'

    };
  }
}


// deposit


deposit = (acno, password, amount) => {

  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]["password"]) {

      userDetails[acno]["balance"] += amnt;
      userDetails[acno]["transaction"].push({ type: 'CREDIT', amount: amnt })


      return {
        statusCode: 200,
        status: true,
        message: userDetails[acno]["balance"]

      };
    }

    else {

      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password'

      };
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: 'incorrect account number'

    };
  }
}


// withdraw

withdraw = (acno, password, amount) => {

  var amnt = parseInt(amount);
  if (acno in userDetails) {
    if (password == userDetails[acno]["password"]) {
      if (amnt <= userDetails[acno]['balance']) {
        userDetails[acno]["balance"] -= amnt;
        userDetails[acno]["transaction"].push({ type: 'DEBIT', amount: amnt })


        return {
          statusCode: 200,
          status: true,
          message: userDetails[acno]["balance"]

        };
      }
      else {

        return {
          statusCode: 401,
          status: false,
          message: 'insufficient balance'

        };
      }
    }

    else {

      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password'

      };
    }
  }
  else {

    return {
      statusCode: 401,
      status: false,
      message: 'incorrect account no'

    };
  }
}


// transaction

gettransaction = (acno) => {
  if (acno in userDetails) {
    return {
      statusCode: 200,
      status: true,
      message: userDetails[acno]["transaction"]

    }

  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: 'incorrect acno'

    }
  }
}


// export


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction
}