// copied over from backend

/* GET a goal's day's post: "am", "pm", "tendays" */
router.get('/:goalid/:day/:posttype',ensureUserGoal, async (req, res,next) => {
    try {
        const result = await Post.getPostOfDay(req.params.posttype,req.params.goalid, req.params.day);
        if(req.params.posttype == 'tendays'){
            const metrics = await Post.getMetrics(req.params.goalid, req.params.day)
            result.metrics = metrics
        }

        return res.json({post:result})
    } catch(e) {
        return next(e)
    }
})
