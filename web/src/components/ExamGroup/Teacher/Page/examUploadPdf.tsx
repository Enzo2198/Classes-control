import {Box, Button, Grid, Typography} from "@mui/material";
import useUploadFile from "../CustomHook/examUploadPdf.ts";
import TeacherAnswers from "./examUploadAnswers.tsx";

export default function TeacherExamDetail() {
  const {
    handleFileUpload,
    handleBackToExamGroups,
    handleBackToExamGroupDetail,
    examGroup,
    examIdNum,
    state,
    examGroupIdNum,
    dispatch,
    selectedFile
  } = useUploadFile()

  return (
    <>
      <Box sx={{
        height: 'calc(100vh - 112px)',
        display: "flex",
        flexDirection: "column"
      }}>
        <Box sx={{display: 'flex', mb: 2, flexShrink: 0}}>
          <Typography
            variant="h6" fontWeight="bold"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
              mr: 2
            }}
            onClick={handleBackToExamGroups}
          >
            Danh sách bài thi
          </Typography>

          <Typography variant="h6" fontWeight="bold" sx={{mr: 2}}>&gt;</Typography>

          <Typography
            variant="h6" fontWeight="bold"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
              mr: 2
            }}
            onClick={handleBackToExamGroupDetail}
          >{examGroup?.name ?? ''}</Typography>

          <Typography variant="h6" fontWeight="bold" sx={{mr: 2}}>&gt;</Typography>

          <Typography variant="h6" fontWeight="bold">
            {examIdNum ? state.name : 'Thêm đề bài'}
          </Typography>
        </Box>

        <Box sx={{
          flexGrow: 1,
          minHeight: 0,
        }}>
          <Grid container spacing={2} sx={{height: "100%"}}>
            <Grid size={{xs: 12, lg: 5.5}} sx={{
              height: '100%',
              border: '1px dashed #cccccc',
              backgroundColor: "#ffffff",

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {
                state?.file?.url ? (
                  <Box sx={{
                    width: '100%',
                    height: '100%'
                  }}>
                    <iframe
                      src={`${state.file.url}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block'
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    <input
                      id="exam-upload"
                      type="file"
                      accept="application/pdf,image/*"
                      style={{display: 'none'}}
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="exam-upload">
                      <Button variant="contained" size="large" component="span" sx={{mt: 2}}>
                        Tải lên từ máy
                      </Button>
                    </label>
                  </>
                )
              }
            </Grid>

            <Grid size={{xs: 12, lg: 6.5}} sx={{
              height: '100%',
              border: 'none',
              overflowY: 'auto',
              backgroundColor: "#ffffff",

            }}>
              <TeacherAnswers
                handleBackToExamGroupDetail={handleBackToExamGroupDetail}
                examGroupIdNum={examGroupIdNum} examIdNum={examIdNum}
                state={state} dispatch={dispatch}
                selectedFile={selectedFile}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}