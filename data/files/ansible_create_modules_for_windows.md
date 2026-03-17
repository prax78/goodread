### Step 1: Create the Module Directory
First, create a directory structure for your custom module. For example:

```
my_ansible_project/
└── library/
    └── my_custom_module.ps1
```

### Step 2: Write the Custom Module
Inside `my_custom_module.ps1`, write the code for your custom module:

```powershell
#Requires -Module Ansible.ModuleUtils.Legacy
$ErrorActionPreference = "Stop"
$params = Parse-Args $args -supports_check_mode $true
$check_mode = Get-AnsibleParam -obj $params -name "_ansible_check_mode" -default $false
$parameter_1 = Get-AnsibleParam -obj $params -name "parameter_1!" -type "str" -failifempty $true
$parameter_2 = Get-AnsibleParam -obj $params -name "parameter_2" -type "str" -failifempty $true

try{
    $result = @{result="Script Executed Successfully"
               change=$true}
Exit-Json $result
}catch{
$result = @{result="Script Failed!!"
            change=$false}
Fail-Json $result
}


```

### Step 3: Use Your Custom Module in a Playbook
Create a playbook to use your custom module. Save the playbook as `test_my_custom_module.yml`:

```yaml
# test_my_custom_module.yml
---
- name: Test custom PS module for Windows
  hosts: windows
  tasks:
    - name: Test custom PS module for Windows
      my_custom_module:
        parameter_1: "hello"
        parameter_2: "world"
      register: result

```

### Step 4: Run the Playbook
Run the playbook to see the custom module in action:

```bash
ansible-playbook test_my_custom_module.yml
```