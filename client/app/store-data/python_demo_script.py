#!/usr/bin/env python
import os
import time
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from subprocess import call
import socket

file_names = ('/var/log/gather-consumer.log', '/var/log/fetch-consumer.log')
mail_from = 'no-reply@data.gov'
recipient_emails = ['data.gov.support@reisystems.com', 'root@localhost']
harvester_errors = set(['sqlalchemy.exc.OperationalError', 'Problems were found while connecting to the SOLR server','redis.exceptions.ConnectionError'])
message_body = ""
hostname = socket.gethostname()
all_logs = list()

#harvester_successes = set(['objects to the fetch queue',])
#Gather queue consumer registered
#Fetch queue consumer registered

def _send_mail(mail_from='', recipient_emails=[''],
        msg=MIMEText(''.encode('utf-8'), 'plain', 'utf-8')):
    # Send the email using Python's smtplib.
    smtp_connection = smtplib.SMTP()
    smtp_connection.connect('localhost')
    try:
        smtp_connection.ehlo()
        smtp_connection.sendmail(mail_from, recipient_emails, msg.as_string())
        print ("Sent email to {0}".format(', '.join(recipient_emails)))

    except smtplib.SMTPException, e:
        msg = '%r' % e
        print (msg)
        raise MailerException(msg)
    finally:
        smtp_connection.quit()

for file_name in file_names:
    log = open(file_name, 'r').readlines()
    log_tail = log[-15:]
    all_logs.append(log_tail)

#gather_log, fetch_log = all_logs

for i,log in enumerate(all_logs):
    for line in log:
        current_time = datetime.now()
        if any(error in line for error in harvester_errors):
            message_body += str(current_time) + " - Gather log error: \n" if i == 0 else "Fetch log error: \n"
            message_body += str(current_time) + " - " +  line + "\n"

for i,file_name in enumerate(file_names):
    try:
        mtime = os.path.getmtime(file_name)
    except OSError:
        mtime = 0
    current_time = datetime.now()
    last_modified = datetime.fromtimestamp(mtime)
    time_difference_hours = (current_time - last_modified).total_seconds() / 3600
    if time_difference_hours > 12:
        message_body += str(current_time) + " - {0} has not been updated in 12 hours. Last time it was updated: {1}. Will perform a manual supervisor restart. \n".format(file_name, str(last_modified))
        #if i == 0:
        #    return_code = call("supervisorctl restart harvest-gather", shell=True) 
        #elif i == 1:
        #    return_code = call("supervisorctl restart harvest-fetch:*", shell=True)

if message_body:
    msg = MIMEText(message_body)
    msg['Subject'] = 'Harvesting log errors for: ' + str(hostname)
    msg['To'] = 'data.gov.support@reisystems.com'
    _send_mail(mail_from, recipient_emails, msg)
    print message_body
else:
    print str(current_time) + " - There were no errors during this check"