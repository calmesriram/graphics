pragma solidity^0.4.0;
import "./Register.sol";

contract Client_To_Bank is Register
{
    struct Bank_Client
    {
        address bank_address;
        address user_address;
        uint256 amount;
    }

    mapping(address => mapping(address => Bank_Client)) public bank_client_Details;

    //Bank can stores the users details
    mapping(address => mapping(uint256 => address)) public bank_owner_clients;
    mapping(address => uint256) public bank_client_count;

    //User can stores the deposited bank details
    mapping(address => mapping(uint256 => address)) public my_acc_details;
    mapping(address => uint256) public my_acc_count;

    function register_client(address bank_addr) public
    {
        require(bank_addr!=msg.sender);
        bank_client_Details [bank_addr] [msg.sender].bank_address = bank_addr;
        bank_client_Details [bank_addr] [msg.sender].user_address = msg.sender;
        bank_owner_clients [bank_addr] [ bank_client_count [bank_addr] ] = msg.sender;
        bank_client_count [bank_addr]++;

        my_acc_details [msg.sender] [ my_acc_count [msg.sender] ] = bank_addr;
        my_acc_count [msg.sender]++;
    }

    function deposit_client(address bank_addr, uint256 amount) public
    {
        require(bank_d1 [msg.sender].bal >= amount);
        
        if(bank_client_Details [bank_addr] [msg.sender].user_address != msg.sender)
        {
            register_client(bank_addr);
        }
        
        bank_client_Details [bank_addr] [msg.sender].amount += amount;
        bank_d1 [msg.sender].bal -= amount;
        bank_d1 [bank_addr].bal += amount;
        
    }
    
    function withdraw_client(address bank_addr, uint256 amount) public
    {
        require(bank_d1 [bank_addr].bal >= amount);
        
        //require(bank_client_Details [bank_addr] [msg.sender].user_address != msg.sender);
        //bank_d1[msg.sender].bal += amount;
        bank_client_Details [bank_addr] [msg.sender].amount -= amount;
        bank_d1 [msg.sender].bal += amount;
        bank_d1 [bank_addr].bal -= amount;
    }
    
    function transfer_client(address bank_addr, address to, uint256 amount) public
    {
        require(bank_d1 [bank_addr].bal >= amount);
         
        //require(bank_client_Details [bank_addr] [msg.sender].user_address != msg.sender);
        //bank_d1[msg.sender].bal += amount;
        bank_client_Details [bank_addr] [msg.sender].amount -= amount;
        bank_d1[bank_addr].bal -=amount;
        bank_d1[to].bal += amount;
    }
    
    
    function give_interest() public
    {
        address temp_bank_address;
        uint256 temp_amount;
        uint256 temp_interest;
        uint256 temp_int_amt;
        
        for(uint256 i=0;i<bank_client_count [msg.sender];i++)
        {
            temp_bank_address = bank_owner_clients [msg.sender] [i];
            temp_amount = bank_client_Details [msg.sender] [temp_bank_address].amount;
            temp_interest = bank_d1 [msg.sender].account_deposit_interst;
            
            temp_int_amt=(temp_amount * (temp_interest/100))/100;
            
            require(temp_int_amt <= bank_d1[msg.sender].bal);
            
            bank_client_Details [msg.sender] [temp_bank_address].amount += temp_int_amt;
        }
    }
}