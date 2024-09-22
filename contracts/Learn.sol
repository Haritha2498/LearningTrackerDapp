// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Learn{
    // Certificate struct
    struct Certificate {
        string candidateName;
        string courseTitle;
        string issuingAuthority;
        uint256 duration; // Duration in days
        string issueDate; // Timestamp of the certificate issue date
        address addedBy;
    }

    // Token details
    string public constant name = "CertificateToken";
    string public constant symbol = "CERT";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    // Owner of the contract
    address public owner;

    // Mapping from user address to their certificates
    mapping(address => Certificate[]) private certificates;

    // Event to emit when a certificate is added
    event CertificateAdded(
        address indexed user,
        string candidateName,
        string courseTitle,
        string issuingAuthority,
        uint256 duration,
        string issueDate,
        address addedBy
    );

    // Event to emit when tokens are transferred
    event TokensTransferred(address indexed from, address indexed to, uint256 amount);

    // Constructor to mint 100 tokens to the contract owner upon deployment
    constructor() {
        owner = msg.sender;
        uint256 initialTokens = 100 * (10 ** uint256(decimals));
        totalSupply = initialTokens;
        balanceOf[owner] = initialTokens;
    }

    // Function to add a new certificate
    function addCertificate(
        string memory _candidateName,
        string memory _courseTitle,
        string memory _issuingAuthority,
        uint256 _duration,
        string memory _issueDate
    ) public {
        Certificate memory newCertificate = Certificate({
            candidateName: _candidateName,
            courseTitle: _courseTitle,
            issuingAuthority: _issuingAuthority,
            duration: _duration,
            issueDate: _issueDate,
            addedBy: msg.sender
        });

        certificates[msg.sender].push(newCertificate);

        emit CertificateAdded(
            msg.sender,
            _candidateName,
            _courseTitle,
            _issuingAuthority,
            _duration,
            _issueDate,
            msg.sender
        );
    }

    // Function to retrieve all certificates for the calling user
    function getCertificates() public view returns (Certificate[] memory) {
        return certificates[msg.sender];
    }

    // Function to retrieve all certificates for a specific user (public access if needed)
    function getCertificatesByUser(address user) public view returns (Certificate[] memory) {
        return certificates[user];
    }

    // Function to transfer 2 tokens to a specified address
    function sendTokens(address _to) public {
        require(balanceOf[msg.sender] >= 2 * (10 ** uint256(decimals)), "Insufficient balance");
        
        uint256 tokenAmount = 2 * (10 ** uint256(decimals));
        balanceOf[msg.sender] -= tokenAmount;
        balanceOf[_to] += tokenAmount;

        emit TokensTransferred(msg.sender, _to, tokenAmount);
    }
}
