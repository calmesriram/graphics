var Register = artifacts.require("./Register.sol");
var Bank = artifacts.require("./Bank.sol");
var Loan_Details = artifacts.require("./Loan_Details.sol");
var Fixed_Deposit = artifacts.require("./Fixed_Deposit.sol");
var Client_To_Bank = artifacts.require("./Client_To_Bank.sol");

module.exports = function(deployer)
{

    deployer.deploy(Register);
    deployer.deploy(Bank);
    deployer.link(Register, Bank,Loan_Details)
    deployer.deploy(Loan_Details);
    deployer.deploy(Fixed_Deposit);
    deployer.link(Register,Fixed_Deposit);
    deployer.deploy(Client_To_Bank);
    deployer.link(Register,Client_To_Bank);
    
};