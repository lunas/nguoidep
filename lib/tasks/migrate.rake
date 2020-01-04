# Script to migrate issues and pages from old ndouidep to new ngouidep.
#
#           Old         New
# ---------------------------
# Issue:    title       title
#           date        date
#
# Page
#           title
#           issue_id
#           page_nr
#           image?
#           url??
#
# active_storage_attachment
#           name
#           record_type
#           record_id
#           blob_id
#
# active_storage_blob
#           id
#           key
#           filename
#           content_type
#           metadata
#           byte_size
#           checksum
#
#
# Scheint nicht moeglich, die URL in ActiveStorage zu definieren, d.h. man kann
# sie nicht einfach auf bestehende Pfade in s3 zeigen lassen :-(
# Daher also
# 1. von s3 Carrierwave Pfad downloaden
# 2. neue Modell (Page) Instanz erstellen und dazugehoerendes Bild uploaden:
# https://www.stefanwienert.de/blog/2018/11/05/activestorage-migrating-from-carrierwave-attachment-pointers/