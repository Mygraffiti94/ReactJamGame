import json
import sys

def create_map_from_json(json_file: str):
    """
    Json file like below:
    {
        "x": 10,
        "y": 10,
        "blue_blocks": [72, 79, 88],
        "orange_blocks": [71, 82, 78],
        "extra_walls": [33, 34, 35, 45, 55, 56, 57],
        "blue_drops": [44],
        "orange_drops": [46] 
    }

    :param json_file: path and filename of json file with configurations 
    """
    with open(json_file, 'r') as f:
        configuration = json.load(f)
    map_data = '['
    for row in range(1, configuration['x'] + 1):
        for column in range(0, configuration['y']):
            idx = row * column
            if idx in configuration['blue_blocks']:
                map_data = map_data + '{type: "e_blu"}, '
            elif idx in configuration['orange_blocks']:
                map_data = map_data + '{type: "e_org"}, '
            elif idx in configuration['blue_drops']:
                map_data = map_data + '{type: "e_bgl"}, '
            elif idx in configuration['orange_drops']:
                map_data = map_data + '{type: "e_ogl"}, '
            elif idx in configuration['extra_walls']:
                map_data = map_data + '{type: "e_wal"}, '
            elif idx < configuration['y']:
                map_data = map_data + '{type: "e_wal"}, '
            elif idx % configuration['y'] == 0 in [0, 1]:
                map_data = map_data + '{type: "e_wal"}, '
            elif idx > ((configuration['x'] - 1) * configuration['y']):
                map_data = map_data + '{type: "e_wal"}, '
            elif idx == (configuration['x'] * configuration['y'] - 1):
                map_data = map_data + '{type: "e_wal"}]'
            else:
                map_data = map_data + '{type: "e_air:}, '
    print(map_data)

if __name__ == '__main__':
    json_file_name = sys.argv[1]
    create_map_from_json(json_file=json_file_name)
            

