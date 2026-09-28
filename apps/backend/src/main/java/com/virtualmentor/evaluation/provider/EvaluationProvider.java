package com.virtualmentor.evaluation.provider;

import java.util.List;

import com.virtualmentor.conversation.entity.ConversationMessage;
import com.virtualmentor.evaluation.provider.model.EvaluationResult;
import com.virtualmentor.interview.entity.Interview;

public interface EvaluationProvider {

    EvaluationResult evaluate(
            Interview interview,
            List<ConversationMessage> messages);
}