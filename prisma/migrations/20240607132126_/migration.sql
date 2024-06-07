-- DropForeignKey
ALTER TABLE "MeetingDate" DROP CONSTRAINT "MeetingDate_meetingId_fkey";

-- AlterTable
ALTER TABLE "MeetingDate" ALTER COLUMN "meetingId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "MeetingDate" ADD CONSTRAINT "MeetingDate_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("urlIdentifier") ON DELETE RESTRICT ON UPDATE CASCADE;
