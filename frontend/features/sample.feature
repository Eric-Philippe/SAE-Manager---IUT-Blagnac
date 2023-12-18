Feature: SAE Frontend Utils

  Scenario: Putting the right year on the Copyright Component
    Given The usage of the Copyright Component
    When I display the year of the copyright
    Then The year should be the current year

  Scenario Outline: Converting an API SAE Status to a Frontend SAE Status
    Given the number given from the API is <apiStatus>
    When I convert the API status to a Frontend status
    Then the Frontend status should be "<frontendStatus>"
    Examples:
        | apiStatus | frontendStatus               |
        | 0         | PENDING_USERS                |
        | 1         | PENDING_WISHES               |
        | 2         | LAUNCHED                     |
        | 3         | LAUNCHED_OPEN_FOR_INTERNSHIP |
        | 4         | CLOSED                       |

  Scenario Outline: Converting a Frontend SAE Status to a Human Readable Text
    Given the Frontend status is "<frontendStatus>"
    When I convert the Frontend status to a human readable text
    Then the human readable text should be "<humanReadableText>"
    Examples:
        | frontendStatus               | humanReadableText                               |
        | PENDING_USERS                | En attente du remplissage des fiches étudiantes |
        | PENDING_WISHES               | En attente du remplissage des voeux             |
        | LAUNCHED                     | Lancée                                          |                   
        | LAUNCHED_OPEN_FOR_INTERNSHIP | Lancée et ouverte aux alternants                |  
        | CLOSED                       | Clôturée                                        |

  Scenario: Running all the React tests
    Given a node script to run all the React tests
    When I run the script
    Then all the tests should pass

  Scenario: Check pages integrity
    Given all the app pages in the pages folder
    When I check that all the pages contains the basics components BlankLayout, Header, Footer
    Then all the pages should pass the test