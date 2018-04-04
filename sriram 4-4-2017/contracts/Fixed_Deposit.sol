pragma solidity ^0.4.0;
import "./Register.sol";

contract Fixed_Deposit is Register
{
    uint eth=1 ether;
    //uint256 public ln_req_count=0;
    struct fix_dep_user
    {
        uint256 id;
        address bank_address;
        uint256 amount;
        uint start_time;
        uint end_time;
        uint year;
        bool check;
    }
    
    mapping (address => mapping (uint256 => fix_dep_user) )public fix_user;
    mapping(address => uint256)public fix_user_count;
    
    struct fix_dep_bank
    {
        address bank_address;
        uint256 amount;
        uint time;
        uint year;
    }
    
    mapping (address => mapping (uint256 => fix_dep_bank) )public fix_bank;
    mapping(address => uint256)public fix_bank_count;
    
    function fix_dep(address bank_address,uint256 amt,uint8 year)public
    {
        //require(bank_d1[bank_address].time != 0);
        require(bank_address != msg.sender);
        
        require (bank_d1[msg.sender].bal > amt *eth);
            
        bank_d1[msg.sender].bal -= amt*eth;
        bank_d1[bank_address].bal += amt*eth;
        
        
        fix_user[msg.sender][ fix_user_count[msg.sender] ].bank_address = bank_address;
        fix_user[msg.sender][ fix_user_count[msg.sender] ].amount = amt*eth;
        fix_user[msg.sender][ fix_user_count[msg.sender] ].start_time = now;
        fix_user[msg.sender][ fix_user_count[msg.sender] ].end_time =0;//now + (year *1 years);
        fix_user[msg.sender][ fix_user_count[msg.sender] ].year = year;
        fix_user[msg.sender][ fix_user_count[msg.sender] ].check=true;
        
        fix_bank[bank_address][ fix_bank_count[bank_address] ].bank_address = msg.sender;
        fix_bank[bank_address][ fix_bank_count[bank_address] ].amount = amt*eth;
        fix_bank[bank_address][ fix_bank_count[bank_address] ].time = now;
        fix_bank[bank_address][ fix_bank_count[bank_address] ].year = year;
        
        fix_bank_count[bank_address]++;
        fix_user_count[msg.sender]++;
    
    }
    
    function fix_amt_get(uint id)public returns(string)
    {  
        require(fix_user[msg.sender][ id ].check);
        
        address temp_bank_address = fix_user[msg.sender][id].bank_address;
        uint temp_amt = fix_user[msg.sender][id].amount;
        uint temp_end_time = fix_user[msg.sender][id].end_time;
        uint temp_year = fix_user[msg.sender][id].year;
        
        if(now>temp_end_time)
        {   
            uint intr = bank_d1[temp_bank_address].fixed_deposit_interst;
            // uint amont = ( temp_amt+( temp_amt* (intr/100)/temp_year ) /100;
          
            uint amount=temp_amt+((intr*temp_amt/100)*temp_year);
            require(amount <= bank_d1[temp_bank_address].bal);
            fix_user[msg.sender][ id ].check=false;
            bank_d1[msg.sender].bal += amount;
            bank_d1[temp_bank_address].bal -= amount;
            return "Amount transferred";
        }
    }
}
