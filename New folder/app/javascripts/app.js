

// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import bank_artifacts from '../../build/contracts/Fixed_deposit.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Bank = contract(bank_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Bank.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
    
      accounts = accs;
      account = accounts[0];

      self.basicfunctions();
      

      self.bank_list();
      self.loan_list();
      self.fix_list();
      self.get_loan_list();
      self.fix_loan_list();
      self.bank_d1();
   
    });
    this.showBalance();

  $("#deposit-bank").click(function(event) {

    var self = this;

    var deposit_amount = parseInt(document.getElementById("deposit-amount").value);

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      console.log(web3.toWei(deposit_amount, 'ether'));
      return instance.deposit({from: account, gas: 6000000, value: web3.toWei(deposit_amount, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });
  $("#deposit").click(function(event) {

    var self = this;
    var address1=document.getElementById("deposit-address").value;
    var deposit_amount = parseInt(document.getElementById("deposit-amount").value);

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      console.log(web3.toWei(deposit_amount, 'ether'));
      return instance.deposit_client(address1,deposit_amount,{from: account, gas: 6000000, value: web3.toWei(deposit_amount, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });

  $("#withdraw").click(function(event) {

    var self = this;

    var withdraw_amount = parseInt(document.getElementById("withdraw-amount").value);

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      console.log(web3.toWei(withdraw_amount, 'ether'));
      return instance.withdraw({from: account, gas: 6000000, value: web3.toWei(withdraw_amount, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });
  $("#withdraw1").click(function(event) {

    var self = this;
    var address1=document.getElementById("withdraw-address").value;
   

    var withdraw_amount = parseInt(document.getElementById("withdraw-amount").value);

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      console.log(web3.toWei(withdraw_amount, 'ether'));
      return instance.withdraw_client(address1,withdraw_amount,{from: account, gas: 6000000, value: web3.toWei(withdraw_amount, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });

  $("#register-bank").click(function(event) {

    var self = this;

    var interest = document.getElementById("interest").value* 100;
    var loan_interest = document.getElementById("loan-interest").value* 100;
    var deposit_interest =document.getElementById("deposit-interest").value* 100;
    var bank_name = document.getElementById("bank-name").value;

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      return instance.register(bank_name, deposit_interest, loan_interest, interest, {from: account, gas: 6000000});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });
  $("#transfer-amount").click(function(event) {

    var self = this;
    var address=document.getElementById("t").value;
    var transfer_amount = parseInt(document.getElementById("t1").value);

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      console.log(web3.toWei(transfer_amount, 'ether'));
      return instance.transfer(address,{from: account, gas: 6000000, value: web3.toWei(transfer_amount, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });

  $("#transfer").click(function(event) {

    var self = this;
    var address1 = document.getElementById("tt").value;
    var address2 = document.getElementById("t").value;
   
    var amount1= parseInt(document.getElementById("t1").value);
  

    $("#status").html("Initiating transaction... (please wait)");

    Bank.deployed().then(function(instance) {
      return instance.transfer_client(address1,address2,amount1,{from: account, gas: 6000000, value: web3.toWei(amount1, 'ether')});
    }).then(function() {
      $("#status").html("Transaction complete!");
      App.showBalance();
    }).catch(function(e) {
      console.log(e);
      $("#status").html("Error in transaction; see log.");
    });
  });
  },

  basicfunctions : function(){
    $("#account").val(account)
    
    web3.eth.getBalance(account, (err, balance) => {
      balance = web3.fromWei(balance, "ether") + ""
      $("#balance").val(balance.trim())
    });
  },

  showBalance: function() {
    var self = this;

    var bank;
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.isRegistered(account);
    }).then(function(val) {
      console.log(val);
      if (val == true) {
        $("#reg_bank").html('');
        $("#bank-info").html("This bank has registered");
      } else {
        $("#bank-info").html("This bank has not registered yet");
      }
      return bank.fetchBalance(account);
    }).then(function(val) {
      $("#balance-address").html("This bank's balance is " + web3.fromWei(val, "ether") + " Ξ");
    }).catch(function(e) {
      console.log(e);
    });
  },



  bank_list : function(){
    var self = this;

    var bank;

    $("#bank_list").html('');
    $("#bank_list").append('<table class="table table-striped"><thead><tr><th>Bank Address</th><th>Bank Name</th><th>Balance</th><th>Fixed Int.</th><th>Interest</th></tr></thead><tbody id="body_bank"></tbody></table>');
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.show_registers();
    }).then(function(val) {
       $.each(val,function(err,data){
        bank.bank_d1(data).then(function(result){
          $("#body_bank").append('<tr><td>'+data+'</td><td>'+result[0]+'</td><td>'+web3.fromWei(result[1].toNumber(), "ether")+" Ξ"+'</td><td>'+(result[3]/100)+" %"+'</td><td>'+(result[4]/100)+" %"+'</td><td>'+(result[5]/100)+" %"+'</td></tr>')
        })
       })
      
    });
  },
  bank_d1 : function(){
  
    var self = this;

    var bank;

    $("#bank_list").html('');
    $("#bank_list").append('<table class="table table-striped"><thead><tr><th>Bank Address</th><th>Bank Name</th><th>Balance</th><th>Loan Int.</th><th>Fixed Int.</th><th>Deposite Int.</th></tr></thead><tbody id="body_bank"></tbody></table>');
    
    Bank.deployed().then(function(instance) {
      bank = instance;
      return instance.bank_d1(account);
    }).then(function(val) {
   
      document.getElementById('bkname').value = val[0];
  
    });
  },
  
get_loan : function(){
  var loan_amount  = parseInt($("#loan-amount").val());
  var loan_address = $("#loan-address").val();
  var loan_time = parseInt($("#loan-time").val());

  $("#loan-status").html("Initiating transaction... (please wait)");
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.req_loan(loan_address,loan_amount,loan_time,{from:account,gas: 6000000});
  }).then(function(val) {
    $("#loan-status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#loan-status").html("Error in transaction; see log.");
  });
},
fixed_loan : function(){
  var loan_amount  = parseInt($("#loan-amount").val());
  var loan_address = $("#loan-address").val();
  var loan_time = parseInt($("#loan-time").val());

  $("#loan-status").html("Initiating transaction... (please wait)");
  
  var self = this;
  var bank;
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.fix_dep(loan_address,loan_amount,loan_time,{from:account,gas: 6000000});
  }).then(function(val) {
    $("#loan-status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#loan-status").html("Error in transaction; see log.");
  });
},


loan_list:function(){
  var self = this;
  var bank;
  $("#loan_list").html('')
  Bank.deployed().then(function(instance) 
  {
    bank = instance;
    return bank.ln_pro_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.ln_pro(account,i).then(function(data,err){
          var myDate = new Date( (data[3].toNumber()) *1000);
          var a=(myDate.toLocaleString());
          $("#loan_list").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+ " Ξ"+'</td><td>'+data[3]+'</td></tr>');
        });
      }
  });
},
fix_list:function(){
  var self = this;
  var bank;
  $("#fix_list").html('')
  Bank.deployed().then(function(instance) 
  {
    bank = instance;
    return bank.fix_bank_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.fix_bank(account,i).then(function(data,err){
          var myDate = new Date( (data[3].toNumber()) *1000);
          var a=(myDate.toLocaleString());
          $("#fix_list").append('<tr><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+ " Ξ"+'</td><td>'+data[3]+'</td></tr>');
         
        });
      }
  });
},


get_loan_list:function(){
  var self = this;
  var bank;
  $("#get_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.ln_get_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.ln_get(account,i).then(function(data,err){
          var myDate = new Date( (data[3].toNumber()) *1000);
          var a=(myDate.toLocaleString());
          $("#get_loan_list").append('<tr><td>'+data[8]+'</td><td>'+data[0]+'</td><td>'+web3.fromWei(data[1].toNumber(), "ether")+ " Ξ"+'</td><td>'+data[2]+'</td><td>'+a.split(',')[0]+'</td><td>'+data[5]+'</td><td>'+web3.fromWei(data[6].toNumber(), "ether")+ " Ξ"+'</td><td>'+web3.fromWei(data[7].toNumber(), "ether")+ " Ξ"+'</td></tr>');
        });
      }
  });
},
fix_loan_list:function(){
  
  var self = this;
  var bank;
  $("#fix_loan_list").html('')
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.fix_user_count(account);
  }).then(function(val) {
      for(var i=0;i<val.toNumber();i++){
        bank.fix_user(account,i).then(function(data,err){
          var myDate = new Date( (data[3].toNumber()) *1000);
          var a=(myDate.toLocaleString());
      
$("#fix_loan_list").append('<tr><td>'+data[0]+'</td><td>'+data[1]+'</td><td>'+web3.fromWei(data[2].toNumber(), "ether")+ " Ξ"+'</td><td>'+a.split(',')[0]+'</td><td>'+a.split(',')[1]+'</td><td>'+data[5]);
        });
      }
  });
},

pay_due:function(){
  var due = parseInt($("#Loan_id").val().trim());
  var self = this;
  var bank;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.settlement(due,{from:account});
  }).then(function() {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
},
pay_fd:function(){
  var due = parseInt($("#Loan_id").val().trim());
  var self = this;
  var bank;
  $("#status").html("Initiating transaction... (please wait)");
  Bank.deployed().then(function(instance) {
    bank = instance;
    return bank.fix_amt_get(due,{from:account});
  }).then(function() {
    $("#status").html("Transaction complete!");
  }).catch(function(e) {
    console.log(e);
    $("#status").html("Error in transaction; see log.");
  });
}

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});