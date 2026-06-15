// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title BankCRM - إدارة عملاء بنك
/// @notice عقد بسيط لإضافة/تعديل/حذف عملاء وإدارة أرصدة بسيطة بواسطة المالك
contract BankCRM {
    address public owner;
    uint256 public customerCount;

    struct Customer {
        uint256 id;
        string name;
        string email;
        uint256 balance; // بالـ wei (أو وحدة يتم الاتفاق عليها)
        bool exists;
    }

    mapping(uint256 => Customer) private customers;
    mapping(address => uint256[]) private ownerCustomers; // إن رغبت بربط address بعملاء (اختياري)

    event CustomerAdded(uint256 indexed id, string name, string email, uint256 balance);
    event CustomerUpdated(uint256 indexed id, string name, string email, uint256 balance);
    event CustomerRemoved(uint256 indexed id);
    event Deposit(uint256 indexed id, uint256 amount);
    event Withdraw(uint256 indexed id, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        customerCount = 0;
    }

    /// @notice إضافة عميل جديد
    function addCustomer(string memory _name, string memory _email, uint256 _initialBalance) public onlyOwner returns (uint256) {
        customerCount++;
        customers[customerCount] = Customer({
            id: customerCount,
            name: _name,
            email: _email,
            balance: _initialBalance,
            exists: true
        });

        emit CustomerAdded(customerCount, _name, _email, _initialBalance);
        return customerCount;
    }

    /// @notice جلب بيانات عميل
    function getCustomer(uint256 _id) public view returns (uint256 id, string memory name, string memory email, uint256 balance, bool exists) {
        Customer memory c = customers[_id];
        return (c.id, c.name, c.email, c.balance, c.exists);
    }

    /// @notice تحديث بيانات عميل (المالك فقط)
    function updateCustomer(uint256 _id, string memory _name, string memory _email) public onlyOwner {
        require(customers[_id].exists, "Customer not found");
        customers[_id].name = _name;
        customers[_id].email = _email;
        emit CustomerUpdated(_id, _name, _email, customers[_id].balance);
    }

    /// @notice حذف عميل (المالك فقط)
    function removeCustomer(uint256 _id) public onlyOwner {
        require(customers[_id].exists, "Customer not found");
        delete customers[_id];
        emit CustomerRemoved(_id);
    }

    /// @notice إيداع لرصيد عميل (المالك فقط)
    function depositToCustomer(uint256 _id, uint256 _amount) public onlyOwner {
        require(customers[_id].exists, "Customer not found");
        customers[_id].balance += _amount;
        emit Deposit(_id, _amount);
    }

    /// @notice سحب من رصيد عميل (المالك فقط) — لا يقوم بتحويل ETH للمستفيد، فقط يسجل المبلغ
    function withdrawFromCustomer(uint256 _id, uint256 _amount) public onlyOwner {
        require(customers[_id].exists, "Customer not found");
        require(customers[_id].balance >= _amount, "Insufficient balance");
        customers[_id].balance -= _amount;
        emit Withdraw(_id, _amount);
    }

    /// @notice تحويل ملكية العقد
    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    /// @notice الحصول على جميع عملاء ضمن نطاق id من start إلى end (للاستخدام في الواجهة)
    function listCustomers(uint256 start, uint256 end) public view returns (Customer[] memory) {
        if (end > customerCount) {
            end = customerCount;
        }
        require(start >= 1 && start <= end+1, "Invalid range");

        uint256 len = end - start + 1;
        Customer[] memory list = new Customer[](len);
        uint256 index = 0;
        for (uint256 i = start; i <= end; i++) {
            Customer memory c = customers[i];
            // إذا تم حذف عميل، نُرجع صف بيانات فارغ (exists=false)
            list[index] = c;
            index++;
        }
        return list;
    }
}
