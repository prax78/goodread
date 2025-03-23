
### Step 1: Create a Plugin Directory
First, create a directory structure for your custom action plugin. For example, create a directory named `action_plugins` inside your project directory:

```
my_ansible_project/
└── action_plugins/
    └── my_custom_action.py
```

### Step 2: Write Your Custom Action Plugin
Inside `my_custom_action.py`, write your custom action plugin. Here, we'll create a simple action plugin that concatenates two strings.

```python
# my_custom_action.py
from ansible.plugins.action import ActionBase

class ActionModule(ActionBase):
    def run(self, tmp=None, task_vars=None):
        result = super(ActionModule, self).run(tmp, task_vars)
        
        # Get the module arguments
        a = self._task.args.get('a')
        b = self._task.args.get('b')
        
        # Perform the action (concatenate the strings)
        result['concatenated'] = a + b
        
        return result
```

In this example, we define an `ActionModule` class that inherits from `ActionBase`. The `run` method gets the module arguments (`a` and `b`), concatenates them, and stores the result in `result['concatenated']`.

### Step 3: Use Your Custom Plugin in a Playbook
Now you can use your custom action plugin in an Ansible playbook. Create a playbook `test_custom_action.yml`:

```yaml
# test_custom_action.yml
---
- name: Test custom action plugin
  hosts: localhost
  tasks:
    - name: Concatenate two strings
      my_custom_action:
        a: "Hello, "
        b: "World!"
      register: result

    - name: Show the concatenated result
      debug:
        msg: "{{ result.concatenated }}"
```

### Step 4: Run the Playbook
Run the playbook to see the custom action plugin in action:

```bash
ansible-playbook test_custom_action.yml
```

The output should show the concatenated result:

```
TASK [Concatenate two strings] ************************************************
ok: [localhost]

TASK [Show the concatenated result] ********************************************
ok: [localhost] => {
    "msg": "Hello, World!"
}
```

### Summary
- **Directory Structure**: Place your custom plugin in the appropriate directory (e.g., `action_plugins` for action plugins).
- **Define the Plugin**: Write the plugin class and the `run` method.
- **Use the Plugin**: Reference the custom action plugin in your playbook and run it.




### Step 1: Create the Module Directory
First, create a directory structure for your custom module. For example:

```
my_ansible_project/
└── library/
    └── my_custom_module.py
```

### Step 2: Write the Custom Module
Inside `my_custom_module.py`, write the code for your custom module:

```python
#!/usr/bin/python

from ansible.module_utils.basic import AnsibleModule

def run_module():
    module_args = dict(
        a=dict(type='int', required=True),
        b=dict(type='int', required=True)
    )

    result = dict(
        changed=False,
        sum=0
    )

    module = AnsibleModule(
        argument_spec=module_args,
        supports_check_mode=True
    )

    a = module.params['a']
    b = module.params['b']
    result['sum'] = a + b

    if module.check_mode:
        module.exit_json(**result)

    result['changed'] = True
    module.exit_json(**result)

def main():
    run_module()

if __name__ == '__main__':
    main()
```

### Step 3: Use Your Custom Module in a Playbook
Create a playbook to use your custom module. Save the playbook as `test_my_custom_module.yml`:

```yaml
# test_my_custom_module.yml
---
- name: Test custom module
  hosts: localhost
  tasks:
    - name: Add two numbers using custom module
      my_custom_module:
        a: 10
        b: 20
      register: result

    - name: Show the result
      debug:
        msg: "The sum is {{ result.sum }}"
```

### Step 4: Run the Playbook
Run the playbook to see the custom module in action:

```bash
ansible-playbook test_my_custom_module.yml
```

The output should show the sum of the two numbers:

```
TASK [Add two numbers using custom module] *************************************
ok: [localhost]

TASK [Show the result] *********************************************************
ok: [localhost] => {
    "msg": "The sum is 30"
}
```

### Summary
- **Directory Structure**: Place your custom module in the `library` directory.
- **Define the Module**: Write the module code in Python, using `AnsibleModule` from `ansible.module_utils.basic`.
- **Use the Module**: Reference the custom module in your playbook and run it.

This example demonstrates creating a simple custom module that adds two numbers. You can expand on this by creating more complex modules to perform various tasks.

Writing a custom plugin in Ansible is a great way to extend its functionality to suit your specific needs. I'll walk you through the steps to create a simple custom filter plugin. 

### Step 1: Create a Plugin Directory
First, create a directory structure for your custom plugin. For example, create a directory named `filter_plugins` inside your project directory:

```
my_ansible_project/
└── filter_plugins/
    └── my_custom_filter.py
```

### Step 2: Write Your Custom Plugin
Inside `my_custom_filter.py`, write your custom filter plugin. Here, we'll create a simple filter that converts a string to uppercase:

```python
# my_custom_filter.py
def to_uppercase(value):
    return value.upper()

class FilterModule(object):
    def filters(self):
        return {
            'to_uppercase': to_uppercase
        }
```

In this example, we define a function `to_uppercase` that converts a string to uppercase. We then create a `FilterModule` class with a `filters` method that returns a dictionary mapping the filter name (`to_uppercase`) to the function.

### Step 3: Use Your Custom Plugin in a Playbook
Now you can use your custom filter in an Ansible playbook. Create a playbook `test_custom_filter.yml`:

```yaml
# test_custom_filter.yml
---
- name: Test custom filter
  hosts: localhost
  vars:
    my_string: "hello world"
  tasks:
    - name: Use custom filter to convert string to uppercase
      debug:
        msg: "{{ my_string | to_uppercase }}"
```

### Step 4: Run the Playbook
Run the playbook to see the custom filter in action:

```bash
ansible-playbook test_custom_filter.yml
```

The output should show the string "hello world" converted to uppercase:

```
TASK [Use custom filter to convert string to uppercase] *********************
ok: [localhost] => {
    "msg": "HELLO WORLD"
}
```

### Summary
- **Directory Structure**: Place your custom plugin in the appropriate directory (e.g., `filter_plugins` for filter plugins).
- **Define the Plugin**: Write the plugin function and `FilterModule` class.
- **Use the Plugin**: Reference the custom filter in your playbook and run it.

This example demonstrates creating a custom filter plugin, but you can create other types of plugins (e.g., action, connection, callback) using a similar approach. 