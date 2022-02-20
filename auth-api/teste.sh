#!/bin/sh
DATA="token=2EDC6E889715C69B6AD9218FB37B3802&content=record&format=json&type=flat&csvDelimiter=&rawOrLabel=raw&rawOrLabelHeaders=raw&exportCheckboxLabel=false&exportSurveyFields=false&exportDataAccessGroups=false&returnFormat=json"
CURL=`which curl`
$CURL -H "Content-Type: application/x-www-form-urlencoded" \
      -H "Accept: application/json" \
      -X POST \
      -d $DATA \
      https://dados.accamargo.org.br/redcap/api/
