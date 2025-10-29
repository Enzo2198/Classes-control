import {Box, Tab, Tabs, Typography} from "@mui/material"
import type {Exam, ExamResult } from "../../../../utils";
import { useState } from "react";
import type {SyntheticEvent, ReactNode} from "react";
import useTeacherMarking from "../CustomHook/marking.ts";
import {Loading} from "../../../Common";
import RemarkingDetail from "../CustomHook/remarkingDetail.tsx";

export default function TeacherMarking() {
  const {handleBackToExamGroup, examGroup, examResults, matchExam, fetchResultData, isLoading} = useTeacherMarking()

  if (isLoading) return <Loading />

  return (
    <>
      <Box sx={{display: 'flex', marginBottom: 3}}>
        <Typography
          variant="h6" fontWeight="bold"
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
            mr: 2
          }}
          onClick={handleBackToExamGroup}
        >
          {examGroup?.name ?? ''}
        </Typography>
        <Typography variant="h6" fontWeight="bold">{`>`} Chấm bài</Typography>
      </Box>

      <Box sx={{backgroundColor: "#ffffff"}}>
        <BasicTabs examResults={examResults} matchExam={matchExam} onSaveSuccess={fetchResultData}/>
      </Box>
    </>
  )
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  examResults: ExamResult[];
  matchExam: (examResult: ExamResult) => Exam | undefined;
  onSaveSuccess: () => Promise<void>;
}

function BasicTabs({examResults, matchExam, onSaveSuccess}: BasicTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={value} onChange={handleChange} aria-label="exam results"
              variant="scrollable"
        >
          {
            examResults.map((examResult: ExamResult, index: number) => {
              return (
                <Tab key={examResult.id} label={`Đề ${index + 1}`} {...a11yProps(index)} />
              )
            })
          }
        </Tabs>
      </Box>

      {
        examResults.map((examResult: ExamResult, index: number) => {
          const matchedExam: Exam = matchExam(examResult)!;
          return (
            <CustomTabPanel key={examResult.id} index={index} value={value}>
              <RemarkingDetail examResult={examResult} exam={matchedExam} onSaveSuccess={onSaveSuccess} />
            </CustomTabPanel>
          )
        })
      }
    </Box>
  );
}