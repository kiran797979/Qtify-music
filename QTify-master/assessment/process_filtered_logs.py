
import json
import sys

def assert_logs(log_json) -> dict:
    print("Asserting logs \n\n\n")
    assessment_result = {}
    test_no = 1
    for test in log_json['runs'][-1]['tests']:
        if(test['attempts'][-1]['state']=='failed'):
            tc = "Test Case "+str(test_no)+": "+test['title'][1] +" - "+ test['title'][2]
            status = "TEST_STATUS_FAILURE"
        elif(test['attempts'][-1]['state']=='passed'):
            tc = "Test Case "+str(test_no)+": "+test['title'][1] +" - "+ test['title'][2]
            status = "TEST_STATUS_SUCCESS"
        else:
            tc = "Test Case "+str(test_no)+": "+test['title'][1] +" - "+ test['title'][2]
            status = "TEST_STATUS_SKIPPED"
        test_no = test_no + 1
        print(tc+"\n"+"Results: "+status+"\n---------------------------------------------")
        assessment_result[tc]=status
    return assessment_result

if __name__ == "__main__":
    filtered_json_path = sys.argv[1] 
    print("Opening filtered logs")
    with open(filtered_json_path, 'r') as f:
        log_json = json.load(f)
    print("Reading filtered logs done")
    assessment_result = assert_logs(log_json)
    print("Writing into assessment_results.json")
    with open("assesment_result.json", 'w+') as f:
        json.dump(assessment_result, f, indent=4)