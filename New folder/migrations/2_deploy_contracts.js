var ConvertLib = artifacts.require("./ConvertLib.sol");

var MetaCoin = artifacts.require("./MetaCoin.sol");

var Register = artifacts.require("./Register.sol");
var Bank = artifacts.require("./Bank.sol");
// var Loan = artifacts.require("./Loan.sol");
// var Ownable = artifacts.require("./Ownable.sol");
var Loan_Details = artifacts.require("./Loan_Details.sol");
var Fixed_Deposit = artifacts.require("./Fixed_Deposit.sol");
var Client_To_Bank = artifacts.require("./Client_To_Bank.sol");


module.exports = function(deployer) {
deployer.deploy(ConvertLib); 
deployer.link(ConvertLib, MetaCoin);
deployer.deploy(MetaCoin);
// deployer.deploy(Loan);
deployer.deploy(Register);
deployer.deploy(Bank);
deployer.deploy(Client_To_Bank);
deployer.deploy(Loan_Details);
deployer.link(Register, Bank,Client_To_Bank,Loan_Details,Fixed_Deposit);
// deployer.deploy(Ownable);
deployer.deploy(Fixed_Deposit);
};