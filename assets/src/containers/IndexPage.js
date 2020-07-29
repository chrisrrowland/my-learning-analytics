import React from 'react'
import Grid from '@material-ui/core/Grid'
import SelectCard from '../components/SelectCard'
import { isObjectEmpty, getObjectValues } from '../util/object'
import WarningBanner from '../components/WarningBanner'
import routes from '../routes/routes'

const objectValuesAreAllZero = obj => getObjectValues(obj).every(x => x === 0)

function IndexPage (props) {
  const { courseInfo, courseId, isAdmin, enrollmentType } = props

  const views = courseInfo.course_view_options

  const isTeacherOrAdmin = () => {
    return isAdmin || enrollmentType === 'TeacherEnrollment'
  }

  if (!isTeacherOrAdmin()) {
    if (isObjectEmpty(views) || objectValuesAreAllZero(views)) {
      return (<WarningBanner>No data visualizations have been added for this course.</WarningBanner>)
    }
  }

  return (
    <Grid container>
      {
        routes(courseId, views, !isTeacherOrAdmin()).map((p, key) => (
          <Grid item xs={12} sm={6} lg={4} key={key}>
            <SelectCard {...props} cardData={p} />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default IndexPage
