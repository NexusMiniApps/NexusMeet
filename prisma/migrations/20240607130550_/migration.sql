-- CreateTable
CREATE TABLE "MeetingDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "meetingId" INTEGER NOT NULL,

    CONSTRAINT "MeetingDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MeetingDate" ADD CONSTRAINT "MeetingDate_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
