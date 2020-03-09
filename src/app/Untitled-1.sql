let utcQuery = ` ,  @tmZone := CASE WHEN hour(offerStartDate)
 < 12 THEN 0-(((hour(offerStartDate) * 60) + minute(offerStartDate)))
  ELSE 1440-(((hour(offerStartDate) * 60) + minute(offerStartDate)))
   END as timeZx, case dayofweek(DATE_ADD(${utcTime},interval @tmZone minute )) 
   when 2 then 2 when 3 then 3 when 4 then 4 when 5 then 5 when 6 then 6 when 7 
   then 7 else 1 end as weekDay,case dayofweek(DATE_ADD(${utcTime},interval @tmZone minute ))
    when 2 then modInit when 3 then tueInit when 4 then wedInit when 5 then thuInit when 6 then 
    friInit when 7 then satInit else sunInit end as todInit, case dayofweek(DATE_ADD(${utcTime},
    interval @tmZone minute )) when 2 then modToday when 3 then tueToday when 4 then wedToday 
    when 5
 then thuToday when 6 then friToday when 7 then satToday else sunToday end as todCurrent `; 