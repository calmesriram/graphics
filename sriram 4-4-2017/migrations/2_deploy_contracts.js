var ConvertLib = artifacts.require("./ConvertLib.sol");

var MetaCoin = artifacts.require("./MetaCoin.sol");

var Register = artifacts.require("./Register.sol");
var Bank = artifacts.require("./Bank.sol");
var Fixed_Deposit = artifacts.require("./Fixed_Deposit.sol");
// var Loan = artifacts.require("./Loan.sol");
// var Ownable = artifacts.require("./Ownable.sol");
var Loan_Details = artifacts.require("./Loan_Details.sol");

module.exports = function(deployer) {
deployer.deploy(ConvertLib); 
deployer.link(ConvertLib, MetaCoin);
deployer.deploy(MetaCoin);
// deployer.deploy(Loan);
deployer.deploy(Register);
deployer.deploy(Bank);
deployer.deploy(Loan_Details);

deployer.link(Register, Bank,Loan_Details,Fixed_Deposit);
// deployer.deploy(Ownable);
deployer.deploy(Fixed_Deposit);
};