import json

# Function to read input data from a file
def read_input_data_from_file(file_path):
    with open(file_path, "r") as file:
        input_data = json.load(file)
    return input_data

def generate_import_statements(import_list):
    statements = {}

    for entry in import_list:
        import_name = entry["importName"]
        import_type = entry["importType"]
        import_as = entry["importAs"]
        import_from = entry["importFrom"]

        if import_from not in statements:
            statements[import_from] = {"default": [], "named": []}

        if import_type == "default":
            statements[import_from]["default"].append(import_name)
        elif import_type == "named":
            statements[import_from]["named"].append((import_name, import_as))
        else:
            raise ValueError(f"Unsupported import type: {import_type}")

    import_statements = []

    for import_from, imports in statements.items():
        if imports["default"]:
            import_statements.append(f"import {', '.join(imports['default'])} from '{import_from}'")

        if imports["named"]:
            named_imports = ', '.join([f"{name}{' as ' + alias if alias else ''}" for name, alias in imports["named"]])
            import_statements.append(f"import {{{named_imports}}} from '{import_from}'")

    return import_statements

# Function to generate React component code
def generate_react_component(component_data):
    imports = generate_import_statements(component_data.get("imports", []))
    template = component_data.get("template", "")
    completion = component_data.get("completion", "")
    variableStatements = component_data.get("variableStatements", "")
    component_code = ""

    for imp in imports:
        component_code += imp + "\n"

    component_code += f"\nfunction {completion}() {{\n"
    component_code +=  variableStatements + "\n\n"
    component_code += "  return (\n"
    component_code += template + "\n"
    component_code += "  );\n}\n\n"
    component_code += f"export default {completion};\n"

    return component_code

# Generate and save React components
input_file_path = "index.json"  # Update to the correct file name
output_file_path = "output_components.json"  # Replace with your desired output file path

input_data = read_input_data_from_file(input_file_path)

variants = ['sm', 'lg', 'xs', 'xl', 'md']
generated_components = {}

for component_name, component_data in input_data.items():
    if 'template' in component_data and not any(variant in component_name for variant in variants):
        component_code = generate_react_component(component_data)
        generated_components[component_name] = component_code
        print(f"Generated {component_name}")

components = ["alertdialog","alert","avatar","badge","box","button","center","checkbox","divider","fab","formcontrol","heading","hstack","icon","image","input","link","modal","popover","pressable","progress","provider","radio","slider","spinner","switch","text","textarea","toast","tooltip","vstack"]


# Categorize based on the given components
categorized_data = {}
for component_name, component_code in generated_components.items():
    for category in components:
        if category.lower() in component_name.lower():
            if category not in categorized_data:
                categorized_data[category] = []
            categorized_data[category].append(component_code)


with open("variants.json", "w") as output_file:
    json.dump(categorized_data, output_file, indent=2)

print(f"React components have been generated and saved to {output_file_path}.")
